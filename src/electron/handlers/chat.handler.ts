import { app, ipcMain } from "electron";
import settings from "electron-settings";
import { getChat, closeChat } from "../drive";
import { Channel, Peer } from "../chat/chat";
import { ipc, IpcHandler, nameofSends, nameofHandler } from "~/shared/ipc";
import { JsonCompatible } from "~/shared/Json";
import {
  getUserConnection,
  registerUserConnection,
  generateUserConnection,
  generateMessage,
  updateUserConnectionData,
  getUserKey,
} from "../users";
import { getUserSettings } from "./auth.handler";

const MAIN_CHANNEL_NAME = "";

let mainChannel: Channel;
let peerPrivateUsers = new Map<string, Peer>();
let channels: Channel[] = [];
let peerUsers = new Map<Peer, string>();
let peerMessage = new Map<Peer, string>();

const destroyChat = () => {
  channels = [];
  peerPrivateUsers = new Map();
  peerUsers = new Map();
  peerMessage = new Map();
  if (mainChannel) {
    if (!mainChannel.isClosed()) {
      mainChannel.close();
    }
    mainChannel = null;
  }
  closeChat();
};

const createMainChannel = () => {
  channels = [];
  peerPrivateUsers = new Map();
  peerUsers = new Map();
  peerMessage = new Map();
  if (mainChannel) {
    if (!mainChannel.isClosed()) {
      mainChannel.close();
    }
    mainChannel = null;
  }
  const chat = getChat();
  if (chat) {
    mainChannel = chat.channel(MAIN_CHANNEL_NAME);
    mainChannel.on("message", (peer, data) => {
      ipc.sends.ON_CHANNEL_MESSAGE(MAIN_CHANNEL_NAME, peer, data);
    });
    mainChannel.on("peer", (peer) => {
      ipc.sends.ON_CHANNEL_PEER_START(MAIN_CHANNEL_NAME, peer);
    });
    mainChannel.on("peer-disconnected", (peer) => {
      ipc.sends.ON_CHANNEL_PEER_END(MAIN_CHANNEL_NAME, peer);
    });
  }
};

app.on("ready", () => {
  ipcMain.on(
    "ON_CHANNEL_PEER_START",
    (event, channelName: string, peer: Peer) => {
      const channel = findChannel(channelName);
      if (!channel && channelName !== MAIN_CHANNEL_NAME) {
        return;
      }
      const message = generateMessage();
      peerMessage.set(peer, message);
      peer.send({
        type: "meet",
        message,
      });
    }
  );
  ipcMain.on(
    "ON_CHANNEL_PEER_END",
    (event, channelName: string, peer: Peer) => {
      const email = peerUsers.get(peer);
      peerMessage.delete(peer);
      peerUsers.delete(peer);
      if (email && channelName === MAIN_CHANNEL_NAME) {
        peerPrivateUsers.delete(email);
      }
      ipc.sends.ON_CHANNEL_UPDATE(channelName);
    }
  );
  ipcMain.on(
    "ON_CHANNEL_MESSAGE",
    async (event, channelName: string, peer: Peer, data: JsonCompatible) => {
      const channel = findChannel(channelName);
      if (!channel && channelName !== MAIN_CHANNEL_NAME) {
        return;
      }
      if (data.type === "auth_fail") {
        destroyChat();
        ipc.sends.ON_CHANNEL_AUTH_FAIL(
          channelName,
          data.from?.email,
          data.name?.name
        );
      } else if (data.type === "meet") {
        const userConnection = generateUserConnection(data.message);
        peer.send({
          type: "auth",
          ...userConnection,
        });
      } else if (data.type === "auth") {
        const email = data.email;
        const name = data.name;
        const publicKey = data.publicKey;
        const signature = data.signature;
        const message = peerMessage.get(peer);
        if (email && name && publicKey && signature && message) {
          let user =
            (await getUserConnection(email, message, signature)) ||
            (channelName === MAIN_CHANNEL_NAME &&
              (await registerUserConnection({
                email,
                name,
                publicKey,
              })));
          if (user) {
            peerUsers.set(peer, email);
            if (email && channelName === MAIN_CHANNEL_NAME) {
              peerPrivateUsers.set(email, peer);
            }
            ipc.sends.ON_CHANNEL_UPDATE(channelName);
            return;
          }
        }
        const user = getUserSettings();
        peer.send({
          type: "auth_fail",
          from: {
            email: user.email,
            name: user.name,
          },
        });
        peer.destroy();
      } else {
        const email = peerUsers.get(peer);
        if (email) {
          if (data.author?.name) {
            await updateUserConnectionData(email, data.author.name);
          }
          const userKey = await getUserKey(email, data.author?.name);
          ipc.sends.ON_CHANNEL_VERIFYED_MESSAGE(
            channelName,
            email,
            data.author?.name,
            userKey,
            data
          );
        }
      }
    }
  );

  ipcMain.on(nameofSends("ON_DRIVE_CREATED"), () => {
    createMainChannel();
  });
});

const setChannels = (arr: Channel[]) => {
  settings.set(
    "channels",
    JSON.stringify(arr.map((channel) => channel.getName()))
  );
  channels = arr;
};

app.on("ready", () => {
  ipcMain.on(nameofSends("ON_SETTINGS_UPDATE_FINISH"), () => {
    getChannels().forEach((channel) => channel.close());
    setChannels([]);
  });
});

const getChannels = (): Channel[] => {
  const chat = getChat();
  if (!chat) {
    setChannels([]);
  } else {
    const channelNames: string[] = settings.get("channels")
      ? JSON.parse(settings.get("channels"))
      : [];

    const notExistedChannels = channelNames.filter(
      (channelName) => !channels.find((c) => c.getName() === channelName)
    );
    channels = [
      ...channels,
      ...notExistedChannels.map((channelName) => chat.channel(channelName)),
    ];
  }
  return channels;
};

export const findChannel = (name: string): Channel => {
  return getChannels().find((channel) => channel.getName() === name);
};

const removeChannel = (name: string) => {
  return setChannels(
    getChannels().filter((channel) => channel.getName() !== name)
  );
};

ipcMain.handle(
  nameofHandler("GET_ONLINE_USERS"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_ONLINE_USERS"]>
  ): Promise<ReturnType<IpcHandler["GET_ONLINE_USERS"]>> => {
    const result: ReturnType<IpcHandler["GET_ONLINE_USERS"]> = [];
    peerPrivateUsers.forEach((peer, email) => {
      result.push(email);
    });
    return result;
  }
);

ipcMain.handle(
  nameofHandler("GET_CHANNELS"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_CHANNELS"]>
  ): Promise<ReturnType<IpcHandler["GET_CHANNELS"]>> => {
    const result: ReturnType<IpcHandler["GET_CHANNELS"]> = {};
    getChannels().forEach((channel) => {
      const arr = [];
      peerUsers.forEach((email, peer) => {
        if (channel.getPeers().has(peer)) {
          arr.push(email);
        }
      });
      result[channel.getName()] = arr;
    });
    return result;
  }
);

ipcMain.handle(
  nameofHandler("SEND_USER_MESSAGE"),
  async (
    event,
    ...args: Parameters<IpcHandler["SEND_USER_MESSAGE"]>
  ): Promise<ReturnType<IpcHandler["SEND_USER_MESSAGE"]>> => {
    const [email, message] = args;
    const chat = getChat();
    const peer = peerPrivateUsers.get(email);
    const user = await ipc.handlers.GET_USER();
    if (chat && peer && user) {
      peer.send({ ...message, author: user });
    }
  }
);

ipcMain.handle(
  nameofHandler("SEND_CHANNEL_MESSAGE"),
  async (
    event,
    ...args: Parameters<IpcHandler["SEND_CHANNEL_MESSAGE"]>
  ): Promise<ReturnType<IpcHandler["SEND_CHANNEL_MESSAGE"]>> => {
    const [name, message] = args;
    const chat = getChat();
    const channel = findChannel(name);
    const user = await ipc.handlers.GET_USER();
    if (chat && channel && user) {
      channel.send({ ...message, author: user });
    }
  }
);

ipcMain.handle(
  nameofHandler("CREATE_CHANNEL"),
  async (
    event,
    ...args: Parameters<IpcHandler["CREATE_CHANNEL"]>
  ): Promise<ReturnType<IpcHandler["CREATE_CHANNEL"]>> => {
    const [name] = args;
    if (!name) {
      return;
    }
    const chat = getChat();
    const user = await ipc.handlers.GET_USER();
    const existChannel = findChannel(name);
    if (!existChannel && chat && user) {
      const channel = chat.channel(name);
      channels.push(channel);
      channel.on("message", (peer, data) => {
        ipc.sends.ON_CHANNEL_MESSAGE(name, peer, data);
      });
      channel.on("peer", (peer) => {
        ipc.sends.ON_CHANNEL_PEER_START(name, peer);
      });
      channel.on("peer-disconnected", (peer) => {
        ipc.sends.ON_CHANNEL_PEER_END(name, peer);
      });
      ipc.sends.ON_CHANNEL_UPDATE(name);
      return channel.getKey();
    }
    return null;
  }
);

ipcMain.handle(
  "CLOSE_CHANNEL",
  async (event, ...args: any[]): Promise<any> => {
    const [name] = args;
    const chat = getChat();
    const channel = findChannel(name);
    if (chat && channel) {
      channel.close();
      removeChannel(name);
      ipc.sends.ON_CHANNEL_UPDATE(name);
      return true;
    }
    return false;
  }
);

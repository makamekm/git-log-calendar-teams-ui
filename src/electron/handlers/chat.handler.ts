import { app, ipcMain } from "electron";
import settings from "electron-settings";
import { getChat, closeChat } from "../drive";
import { Channel, Peer } from "../chat/chat";
import { ipc, nameofSends } from "~/shared/ipc";
import { JsonCompatible } from "~/shared/Json";
import {
  getUserConnection,
  registerUserConnection,
  generateUserConnection,
  generateMessage,
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
      peer.once("disconnected", () => {
        ipc.sends.ON_CHANNEL_PEER_END(MAIN_CHANNEL_NAME, peer);
      });
    });
  }
};

app.on("ready", () => {
  ipcMain.on(
    "ON_CHANNEL_PEER_START",
    (event, channelName: string, peer: Peer) => {
      console.log("ON_CHANNEL_PEER_START", channelName);

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
      console.log("ON_CHANNEL_PEER_END", channelName);
      const email = peerUsers.get(peer);
      peerMessage.delete(peer);
      peerUsers.delete(peer);
      if (email && channelName === MAIN_CHANNEL_NAME) {
        peerPrivateUsers.delete(email);
      }
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
        console.log("ON_AUTH_FAIL", channelName, data.from);
        destroyChat();
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
          // OK
          console.log("ON_CHANNEL_VERIFYED_MESSAGE", channelName, email, data);
          // ipc.sends.ON_CHANNEL_VERIFYED_MESSAGE(channelName, email, data);
        }
      }
    }
  );

  ipcMain.on(nameofSends("ON_DRIVE_CREATED"), () => {
    createMainChannel();
  });
});

// const IDENTIFY_MESSAGE = "whoareyou";
// const keyPair = crypto.keyPair();
// const secretWord = "fsfasdfasdf";

// const signature = crypto.sign(
//   bufferFrom(md5(keyPair.publicKey)),
//   keyPair.secretKey
// );

// const checkWord = md5(secretWord);

// console.log(
//   "HERE",
//   signature.toString("hex"),
//   crypto.verify(
//     bufferFrom(md5(keyPair.publicKey)),
//     signature,
//     keyPair.publicKey
//   )
// );

// userId === signature
// public: signature, userKey, keyPair.publicKey
// private: signature, userKey, keyPair.publicKey, keyPair.secretKey

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
  "GET_CHANNELS",
  async (event, ...args: any[]): Promise<any> => {
    return getChannels().map((channel) => channel.getKey());
  }
);

ipcMain.handle(
  "SEND_MESSAGE_USER",
  async (event, ...args: any[]): Promise<any> => {
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
  "SEND_MESSAGE",
  async (event, ...args: any[]): Promise<any> => {
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
  "CREATE_CHANNEL",
  async (event, ...args: any[]): Promise<any> => {
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
        peer.once("disconnected", () => {
          ipc.sends.ON_CHANNEL_PEER_END(name, peer);
        });
      });
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
      return true;
    }
    return false;
  }
);

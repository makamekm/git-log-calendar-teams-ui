import { app, ipcMain } from "electron";
import settings from "electron-settings";
import { getChat } from "../drive";
import { Channel, Peer } from "../chat/chat";
import { ipc, nameofSends } from "~/shared/ipc";
import { JsonCompatible } from "~/shared/Json";
import {
  getUserConnection,
  registerUserConnection,
  generateUserConnection,
  generateMessage,
} from "../users";

let channels: Channel[] = [];

const peerUsers = new Map<Peer, string>();
const peerMessage = new Map<Peer, string>();

app.on("ready", () => {
  ipcMain.on("ON_PEER_START", (event, channelName: string, peer: Peer) => {
    const channel = findChannel(channelName);
    if (!channel) {
      return;
    }
    const message = generateMessage();
    peerMessage.set(peer, message);
    peer.send({
      type: "meet",
      message,
    });
  });
  ipcMain.on("ON_PEER_END", (event, channelName: string, peer: Peer) => {
    peerMessage.delete(peer);
    peerUsers.delete(peer);
  });
  ipcMain.on(
    "ON_CHANNEL_MESSAGE",
    async (event, channelName: string, peer: Peer, data: JsonCompatible) => {
      const channel = findChannel(channelName);
      if (!channel) {
        return;
      }
      if (data.type === "meet") {
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
            (await registerUserConnection({
              email,
              name,
              publicKey,
            }));
          if (user) {
            peerUsers.set(peer, email);
            return;
          }
        }
        peer.destroy();
      } else {
        const userName = peerUsers.get(peer);
        if (userName) {
          // OK
        }
      }
    }
  );
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
    setChannels([]);
  });
  ipcMain.on(nameofSends("ON_CHANGE_USER"), () => {
    getChannels().forEach((channel) => channel.close());
    setChannels([]);
  });
});

const getChannels = (): Channel[] => {
  const chat = getChat();
  if (!chat) {
    setChannels([]);
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
        peer.once("end", () => {
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

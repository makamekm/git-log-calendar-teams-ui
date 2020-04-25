import { app, ipcMain } from "electron";
import settings from "electron-settings";
import crypto from "hypercore-crypto";
import md5 from "md5";
import bufferFrom from "buffer-from";
// import { nameofHandler, Ipc } from "~/shared/ipc";
import { getChat } from "../drive";
import { Channel } from "../chat/chat";
import { ipc, nameofSends } from "~/shared/ipc";

let channels: Channel[] = [];

// const IDENTIFY_MESSAGE = "whoareyou";
const userKey = "makame";
const keyPair = crypto.keyPair();

const signature = crypto.sign(
  bufferFrom(md5(keyPair.publicKey)),
  keyPair.secretKey
);

console.log(
  "HERE",
  signature.toString("hex"),
  crypto.verify(
    bufferFrom(md5(keyPair.publicKey)),
    signature,
    keyPair.publicKey
  )
);

// userId === signature
// public: signature, userKey, keyPair.publicKey
// private: signature, userKey, keyPair.publicKey, keyPair.secretKey

console.log();

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

const findChannel = (name: string): Channel => {
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
      channel.send({ author: user, ...message });
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
        ipc.sends.ON_CHANNEL_MESSAGE(peer, data);
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

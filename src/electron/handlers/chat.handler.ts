import { app, ipcMain } from "electron";
import settings from "electron-settings";
// import { nameofHandler, Ipc } from "~/shared/ipc";
import { getChat } from "../drive";
import { Channel } from "../chat/chat";
import { UNREGISTERED_SYMBOL, getAuthor } from "../git";
import { ipc } from "~/shared/ipc";

let channels: Channel[] = [];

const getUser = async () => {
  const name = settings.get("name");
  const email = settings.get("email");
  if (!name || !email) {
    return null;
  }
  const config = await ipc.handlers.GET_CONFIG();
  const user = getAuthor(config.users, email, name);
  return (
    (user && user.name) ||
    `${email.toLowerCase()} ${name.toLowerCase()} ${UNREGISTERED_SYMBOL}`
  );
};

ipcMain.handle(
  "SET_USER",
  async (event, ...args: any[]): Promise<void> => {
    const [name, email] = args;
    settings.set("name", name);
    settings.set("email", email);
  }
);

const getChannels = (): Channel[] => {
  const chat = getChat();
  if (chat) {
    return channels;
  } else {
    channels = [];
    return [];
  }
};
const getChannel = (key: string): Channel => {
  return getChannels().find((channel) => channel.getKey() === key);
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
    const [key, message] = args;
    const chat = getChat();
    const channel = getChannel(key);
    const user = await getUser();
    if (chat && channel && user) {
      await channel.send({ author: user, message });
    }
  }
);

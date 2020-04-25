import { ipcMain } from "electron";
import settings from "electron-settings";
import { UNREGISTERED_SYMBOL, getAuthor } from "../git";
import { IpcHandler, ipc, nameofHandler } from "~/shared/ipc";

const users: {
  [signature: string]: {
    userKey: string;
    email: string;
    name: string;
  };
} = {};

export const getUser = async () => {
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
  nameofHandler("SAVE_USER"),
  async (
    event,
    ...args: Parameters<IpcHandler["SAVE_USER"]>
  ): Promise<ReturnType<IpcHandler["SAVE_USER"]>> => {
    const [{ name, email }] = args;
    settings.set("name", name);
    settings.set("email", email);
    ipc.sends.ON_CHANGE_USER();
  }
);

ipcMain.handle(
  nameofHandler("GET_USER"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_USER"]>
  ): Promise<ReturnType<IpcHandler["GET_USER"]>> => {
    const name = settings.get("name");
    const email = settings.get("email");
    return {
      name,
      email,
    };
  }
);

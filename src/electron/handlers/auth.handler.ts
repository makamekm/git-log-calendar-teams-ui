import { ipcMain } from "electron";
import crypto from "hypercore-crypto";
import settings from "electron-settings";
import { IpcHandler, ipc, nameofHandler } from "~/shared/ipc";
import { getUserKey } from "../users";

export const getUserKeys = () => {
  if (!settings.get("userPublicKey") || !settings.get("userSecretKey")) {
    const keyPair = crypto.keyPair();
    settings.set("userPublicKey", keyPair.publicKey.toString("hex"));
    settings.set("userSecretKey", keyPair.secretKey.toString("hex"));
  }
  return {
    publicKey: settings.get("userPublicKey"),
    secretKey: settings.get("userSecretKey"),
  };
};

export const getUserSettings = () => {
  const name = settings.get("name");
  const email = settings.get("email");
  const keyPair = getUserKeys();
  const publicKey = keyPair.publicKey;
  const secretKey = keyPair.secretKey;
  if (!name || !email) {
    return null;
  }
  return {
    name,
    email,
    publicKey,
    secretKey,
  };
};

ipcMain.handle(
  nameofHandler("SAVE_USER"),
  async (
    event,
    ...args: Parameters<IpcHandler["SAVE_USER"]>
  ): Promise<ReturnType<IpcHandler["SAVE_USER"]>> => {
    const [{ email, name, publicKey, secretKey }] = args;
    settings.set("email", email);
    settings.set("name", name);
    settings.set("userPublicKey", publicKey);
    settings.set("userSecretKey", secretKey);
    ipc.sends.ON_CHANGE_USER();
  }
);

ipcMain.handle(
  nameofHandler("GET_USER"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_USER"]>
  ): Promise<ReturnType<IpcHandler["GET_USER"]>> => {
    const user = getUserSettings();
    return user
      ? {
          ...user,
          userKey: await getUserKey(user.email, user.name),
        }
      : null;
  }
);

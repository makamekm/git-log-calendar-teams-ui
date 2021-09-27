import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";

import {
  emptyDir,
  remountDrive,
  closeDrive,
  createDrive,
} from "../modules/drive";
import { getCollectPromise } from "./collect-stats.handler";
import {
  getSettings,
  saveSettings,
  generateKeysSettings,
} from "../modules/settings";

ipcBus.handle(
  nameofHandler("GET_SETTINGS"),
  async (
    ...args: Parameters<IpcHandler["GET_SETTINGS"]>
  ): Promise<ReturnType<IpcHandler["GET_SETTINGS"]>> => {
    return await getSettings();
  }
);

ipcBus.handle(
  nameofHandler("SAVE_SETTINGS"),
  async (
    ...args: Parameters<IpcHandler["SAVE_SETTINGS"]>
  ): Promise<ReturnType<IpcHandler["SAVE_SETTINGS"]>> => {
    const [newConfig] = args;
    await getCollectPromise();
    closeDrive();
    saveSettings(newConfig);
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = newConfig.ignoreSSLCertificate
      ? "0"
      : "1";
    await createDrive();
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

ipcBus.handle(
  nameofHandler("REMOUNT_DRIVE"),
  async (
    ...args: Parameters<IpcHandler["REMOUNT_DRIVE"]>
  ): Promise<ReturnType<IpcHandler["REMOUNT_DRIVE"]>> => {
    await remountDrive();
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

ipcBus.handle(
  nameofHandler("REGENERATE_KEY_PAIR"),
  async (
    ...args: Parameters<IpcHandler["REGENERATE_KEY_PAIR"]>
  ): Promise<ReturnType<IpcHandler["REGENERATE_KEY_PAIR"]>> => {
    generateKeysSettings();
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

ipcBus.handle(
  nameofHandler("EMPTY_DRIVE"),
  async (
    ...args: Parameters<IpcHandler["EMPTY_DRIVE"]>
  ): Promise<ReturnType<IpcHandler["EMPTY_DRIVE"]>> => {
    await emptyDir("/");
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

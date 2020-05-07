import { ipcMain } from "electron";
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

ipcMain.handle(
  nameofHandler("GET_SETTINGS"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_SETTINGS"]>
  ): Promise<ReturnType<IpcHandler["GET_SETTINGS"]>> => {
    return await getSettings();
  }
);

ipcMain.handle(
  nameofHandler("SAVE_SETTINGS"),
  async (
    event,
    ...args: Parameters<IpcHandler["SAVE_SETTINGS"]>
  ): Promise<ReturnType<IpcHandler["SAVE_SETTINGS"]>> => {
    const [newConfig] = args;
    await getCollectPromise();
    closeDrive();
    saveSettings(newConfig);
    await createDrive();
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

ipcMain.handle(
  nameofHandler("REMOUNT_DRIVE"),
  async (
    event,
    ...args: Parameters<IpcHandler["REMOUNT_DRIVE"]>
  ): Promise<ReturnType<IpcHandler["REMOUNT_DRIVE"]>> => {
    await remountDrive();
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

ipcMain.handle(
  nameofHandler("REGENERATE_KEY_PAIR"),
  async (
    event,
    ...args: Parameters<IpcHandler["REGENERATE_KEY_PAIR"]>
  ): Promise<ReturnType<IpcHandler["REGENERATE_KEY_PAIR"]>> => {
    generateKeysSettings();
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

ipcMain.handle(
  nameofHandler("EMPTY_DRIVE"),
  async (
    event,
    ...args: Parameters<IpcHandler["EMPTY_DRIVE"]>
  ): Promise<ReturnType<IpcHandler["EMPTY_DRIVE"]>> => {
    await emptyDir("/");
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

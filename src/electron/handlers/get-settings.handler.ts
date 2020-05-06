import { ipcMain } from "electron";
import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";

import { saveSettings, getSettings, emptyDir, remountDrive } from "../drive";
import { getCollectPromise } from "./collect-stats.handler";

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
    saveSettings(newConfig);
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
  nameofHandler("EMPTY_DRIVE"),
  async (
    event,
    ...args: Parameters<IpcHandler["EMPTY_DRIVE"]>
  ): Promise<ReturnType<IpcHandler["EMPTY_DRIVE"]>> => {
    await emptyDir("/");
    ipc.sends.ON_SETTINGS_UPDATE_FINISH();
  }
);

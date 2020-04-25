import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import {
  saveDriveConfig,
  getDriveConfig,
  emptyDir,
  remountDrive,
} from "../drive";
import { getCollectPromise } from "./collect-stats.handler";

ipcMain.handle(
  nameofHandler("GET_DRIVE_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_DRIVE_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_DRIVE_CONFIG"]>> => {
    return getDriveConfig();
  }
);

ipcMain.handle(
  nameofHandler("SAVE_DRIVE_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["SAVE_DRIVE_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["SAVE_DRIVE_CONFIG"]>> => {
    const [newConfig] = args;
    await getCollectPromise();
    saveDriveConfig(
      newConfig.publicKey,
      newConfig.secretKey,
      newConfig.useDriveSwarm
    );
    ipc.sends.ON_DRIVE_CONFIG_UPDATE_FINISH();
  }
);

ipcMain.handle(
  nameofHandler("REMOUNT_DRIVE_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["REMOUNT_DRIVE_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["REMOUNT_DRIVE_CONFIG"]>> => {
    await remountDrive();
    ipc.sends.ON_DRIVE_CONFIG_UPDATE_FINISH();
  }
);

ipcMain.handle(
  nameofHandler("EMPTY_DRIVE_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["EMPTY_DRIVE_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["EMPTY_DRIVE_CONFIG"]>> => {
    await emptyDir("/");
    ipc.sends.ON_DRIVE_CONFIG_UPDATE_FINISH();
  }
);

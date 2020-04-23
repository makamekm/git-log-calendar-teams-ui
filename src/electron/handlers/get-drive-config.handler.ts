import { ipcMain } from "electron";
import { nameofHandler, Ipc } from "~/shared/ipc";

import { saveDriveConfig, getDriveConfig } from "../drive";

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

    saveDriveConfig(
      newConfig.publicKey,
      newConfig.secretKey,
      newConfig.useDriveSwarm
    );
  }
);

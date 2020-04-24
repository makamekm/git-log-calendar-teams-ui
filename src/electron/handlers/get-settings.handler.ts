import { ipcMain } from "electron";
import settings from "electron-settings";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

ipcMain.handle(
  nameofHandler("GET_SETTINGS"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_SETTINGS"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_SETTINGS"]>> => {
    return {
      useCommunications: settings.get("useCommunications"),
    };
  }
);

ipcMain.handle(
  nameofHandler("SAVE_SETTINGS"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["SAVE_SETTINGS"]>
  ): Promise<ReturnType<Ipc["handlers"]["SAVE_SETTINGS"]>> => {
    const [{ useCommunications }] = args;
    settings.set("useCommunications", useCommunications);
    ipc.sends.ON_CHANGE_SETTING();
  }
);

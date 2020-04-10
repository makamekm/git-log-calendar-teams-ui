import { app, ipcMain } from "electron";
import { nameofHandler, Ipc } from "../../shared/ipc";

ipcMain.handle(
  nameofHandler("APP_INFO"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["APP_INFO"]>
  ): Promise<ReturnType<Ipc["handlers"]["APP_INFO"]>> => {
    await new Promise((r) => setTimeout(r, 1000));
    return {
      appName: app.getName(),
      appVersion: app.getVersion(),
    };
  }
);

import { app, ipcMain } from "electron";
import { nameofHandler, IpcHandler } from "~/shared/ipc";

ipcMain.handle(
  nameofHandler("APP_INFO"),
  async (
    event,
    ...args: Parameters<IpcHandler["APP_INFO"]>
  ): Promise<ReturnType<IpcHandler["APP_INFO"]>> => {
    return {
      appName: app.getName(),
      appVersion: app.getVersion(),
    };
  }
);

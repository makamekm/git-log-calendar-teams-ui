import { app } from "electron";
import { nameofHandler, IpcHandler } from "~/shared/ipc";

ipcBus.handle(
  nameofHandler("APP_INFO"),
  async (
    ...args: Parameters<IpcHandler["APP_INFO"]>
  ): Promise<ReturnType<IpcHandler["APP_INFO"]>> => {
    return {
      appName: app && app.getName(),
      appVersion: app && app.getVersion(),
    };
  }
);

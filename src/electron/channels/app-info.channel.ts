import { app, ipcMain } from "electron";
import { nameofChannel, Ipc } from "../../shared/ipc";

type Result = ReturnType<Ipc["channels"]["APP_INFO"]>;

ipcMain.on(
  nameofChannel("APP_INFO"),
  (event, ...args: Parameters<Ipc["channels"]["APP_INFO"]>) => {
    event.sender.send(nameofChannel("APP_INFO"), {
      appName: app.getName(),
      appVersion: app.getVersion(),
    } as Result);
  }
);

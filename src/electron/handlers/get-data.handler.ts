import { ipcMain, app } from "electron";
import { nameofHandler, Ipc, ipc, nameofSends } from "~/shared/ipc";
import { CACHE_LIFETIME } from "@env/config";

import { readData } from "../git";

let fileMap = null;
let date = +new Date();

app.on("ready", () => {
  ipcMain.on(nameofSends("ON_DRIVE_CONFIG_UPDATE_FINISH"), () => {
    fileMap = null;
  });
  ipcMain.on(nameofSends("ON_COLLECT_FINISH"), () => {
    fileMap = null;
  });
});

ipcMain.handle(
  nameofHandler("GET_DATA"),
  async (): Promise<ReturnType<Ipc["handlers"]["GET_DATA"]>> => {
    if (!fileMap || +new Date() > CACHE_LIFETIME + date) {
      const config = await ipc.handlers.GET_CONFIG();
      fileMap = (await readData(config)).fileMap;
      date = +new Date();
    }
    return fileMap;
  }
);

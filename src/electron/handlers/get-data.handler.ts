import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { readData } from "git-log-calendar-teams";

const REFRESH_DATA_TIMEOUT = 1000 * 60;

let fileMap = null;
let date = new Date();

ipcMain.handle(
  nameofHandler("GET_DATA"),
  async (): Promise<ReturnType<Ipc["handlers"]["GET_DATA"]>> => {
    if (!fileMap || +new Date() - +date > REFRESH_DATA_TIMEOUT) {
      const config = await ipc.handlers.GET_CONFIG();
      fileMap = (await readData(config)).fileMap;
      date = new Date();
    }
    return fileMap;
  }
);

import { ipcMain } from "electron";
import { nameofHandler, Ipc } from "~/shared/ipc";

import { getConfig, collectUnusedUsers } from "git-log-calendar-teams";

const REFRESH_CONFIG_TIMEOUT = 1000 * 10;

let config = null;
let date = new Date();

ipcMain.handle(
  nameofHandler("GET_CONFIG"),
  async (): Promise<ReturnType<Ipc["handlers"]["GET_CONFIG"]>> => {
    if (!config || +new Date() - +date > REFRESH_CONFIG_TIMEOUT) {
      config = await getConfig();
      collectUnusedUsers(config);
      date = new Date();
    }
    console.log(config.path);

    return config;
  }
);

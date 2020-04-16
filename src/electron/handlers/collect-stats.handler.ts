import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { collect, clean } from "git-log-calendar-teams";

const COLLECT_INTERVAL = 1000 * 60 * 15;

let isCollecting = false;

if (process.env.NODE_ENV !== "development") {
  setInterval(() => {
    ipc.handlers.COLLECT_STATS();
  }, COLLECT_INTERVAL);
}

ipcMain.handle(
  nameofHandler("COLLECT_STATS"),
  async (): Promise<ReturnType<Ipc["handlers"]["COLLECT_STATS"]>> => {
    if (isCollecting) {
      return;
    }

    isCollecting = true;
    ipc.sends.ON_COLLECT_STATS(true);
    console.log("collecting started!");
    try {
      await collect();
      await clean();
    } catch (error) {
      console.error(error);
    }
    console.log("collecting finished!");
    ipc.sends.ON_COLLECT_STATS(false);
    isCollecting = false;
  }
);

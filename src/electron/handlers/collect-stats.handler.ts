import { app, ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";
import { RUN_COLLECT_INTERVAL } from "@env/config";

import { collect } from "../git";

const COLLECT_INTERVAL = 15;

let isCollecting = false;

if (RUN_COLLECT_INTERVAL) {
  app.on("ready", () => {
    const runTimeout = async () => {
      let interval: number;
      try {
        const config = await ipc.handlers.GET_CONFIG();
        interval = config.collectInterval;
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        ipc.handlers.COLLECT_STATS();
        runTimeout();
      }, (interval || COLLECT_INTERVAL) * 1000 * 60);
    };
    runTimeout();
  });
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
    const config = await ipc.handlers.GET_CONFIG();
    try {
      await collect(config);
    } catch (error) {
      console.error(error);
    }
    console.log("collecting finished!");
    ipc.sends.ON_COLLECT_STATS(false);
    isCollecting = false;
  }
);

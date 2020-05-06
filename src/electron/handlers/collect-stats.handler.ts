import { app, ipcMain } from "electron";
import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";
import { RUN_COLLECT_INTERVAL } from "@env/config";

import { collect } from "../git";

const COLLECT_INTERVAL = 15;

let isCollecting = false;
let collectingPromise = Promise.resolve();

export const getCollectPromise = () => collectingPromise;

if (RUN_COLLECT_INTERVAL) {
  app.on("ready", () => {
    const runTimeout = async () => {
      let interval: number;
      const settings = await ipc.handlers.GET_SETTINGS();
      try {
        const config = await ipc.handlers.GET_CONFIG();
        interval = config.collectInterval;
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        if (!settings.dontCollect && settings.isDriveWritable) {
          ipc.handlers.COLLECT_STATS();
        }
        runTimeout();
      }, (interval || COLLECT_INTERVAL) * 1000 * 60);
    };
    runTimeout();
  });
}

ipcMain.handle(
  nameofHandler("COLLECT_STATS"),
  async (): Promise<ReturnType<IpcHandler["COLLECT_STATS"]>> => {
    if (isCollecting) {
      return;
    }

    let resolve;
    collectingPromise = new Promise((r) => {
      resolve = r;
    });

    isCollecting = true;
    ipc.sends.ON_COLLECT_STATS(true);
    console.log("collecting started!");
    const config = await ipc.handlers.GET_CONFIG();
    const settings = await ipc.handlers.GET_SETTINGS();
    try {
      if (!settings.dontCollect && settings.isDriveWritable) {
        await collect(config);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("collecting finished!");
    ipc.sends.ON_COLLECT_STATS(false);
    isCollecting = false;

    resolve();

    ipc.sends.ON_COLLECT_FINISH();
  }
);

ipcMain.handle(
  nameofHandler("IS_COLLECTING_STATS"),
  async (): Promise<ReturnType<IpcHandler["IS_COLLECTING_STATS"]>> => {
    return isCollecting;
  }
);

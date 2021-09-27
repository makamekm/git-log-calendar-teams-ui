import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";
import { RUN_COLLECT_INTERVAL } from "@env/config";

import { collect } from "../modules/git";
import { isDriveWritable } from "../modules/drive";

const COLLECT_INTERVAL = 60;

let isCollecting = false;
let collectingPromise = Promise.resolve();

export const getCollectPromise = () => collectingPromise;

if (RUN_COLLECT_INTERVAL) {
  ipcBus.on("ready", () => {
    let inited = false;
    const runTimeout = async () => {
      let interval: number;
      const settings = await ipc.handlers.GET_SETTINGS();
      if (
        settings.forceCollectingInterval &&
        settings.forceCollectingInterval > 0
      ) {
        interval = settings.forceCollectingInterval;
      } else {
        try {
          const config = await ipc.handlers.GET_CONFIG();
          interval = config.collectInterval;
        } catch (error) {
          console.error(error);
        }
      }
      if (!inited) {
        inited = true;
        if (!settings.dontCollect && (await isDriveWritable())) {
          ipc.handlers.COLLECT_STATS();
        }
      }
      setTimeout(async () => {
        if (!settings.dontCollect && (await isDriveWritable())) {
          ipc.handlers.COLLECT_STATS();
        }
        runTimeout();
      }, (interval || COLLECT_INTERVAL) * 1000 * 60);
    };
    runTimeout();
  });
}

ipcBus.handle(
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
    console.log("collecting stats started!");
    const config = await ipc.handlers.GET_CONFIG();
    const settings = await ipc.handlers.GET_SETTINGS();
    try {
      if (!settings.dontCollect && (await isDriveWritable())) {
        await collect(
          config,
          Math.max(1, settings.parallelCollectingJobLimit),
          settings.collectingRepositoryNames,
          settings.limitCollectingRepositoriesPerTry
        );
      }
    } catch (error) {
      console.error(error);
    }
    console.log("collecting stats finished!");
    ipc.sends.ON_COLLECT_STATS(false);
    isCollecting = false;

    resolve();

    ipc.sends.ON_COLLECT_FINISH();
  }
);

ipcBus.handle(
  nameofHandler("IS_COLLECTING_STATS"),
  async (): Promise<ReturnType<IpcHandler["IS_COLLECTING_STATS"]>> => {
    return isCollecting;
  }
);

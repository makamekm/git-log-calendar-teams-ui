import { app } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import { USE_AUTO_UPDATER } from "@env/config";

const UPDATE_INTERVAL = 30;

if (USE_AUTO_UPDATER) {
  app.on("ready", () => {
    const runTimeout = async () => {
      setTimeout(() => {
        autoUpdater.checkForUpdatesAndNotify();
        runTimeout();
      }, UPDATE_INTERVAL * 1000 * 60);
    };
    runTimeout();
  });
}

export class AppUpdater {
  constructor() {
    autoUpdater.logger = log;

    if (USE_AUTO_UPDATER) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  }
}

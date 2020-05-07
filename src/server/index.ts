import { IpcRenderer } from "electron";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import { createDrive, getDrive } from "~/electron/modules/drive";
import { nameofHandler } from "~/shared/ipc";
import { ApplicationSettings } from "~/shared/Settings";

declare global {
  var ipcBus: IpcRenderer;
}

(global as any).ipcBus = {
  send: (channel, ...args) => {},
  invoke: async (channel, ...args): Promise<any> => {
    if (channel === nameofHandler("GET_SETTINGS")) {
      return YAML.parse(
        fs.readFileSync(path.resolve("./server-config.yml"), "utf-8")
      ) as ApplicationSettings;
    }
  },
};

const run = async () => {
  await createDrive();
  console.log("started!");
  setInterval(() => {
    const drive = getDrive();
    if (!drive.live) {
      process.exit(0);
    }
  }, 1000);
};

run();

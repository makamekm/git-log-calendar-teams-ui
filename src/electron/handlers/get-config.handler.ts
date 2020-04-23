import { ipcMain, app } from "electron";
import { nameofHandler, Ipc, nameofSends } from "~/shared/ipc";
import { Config } from "~/shared/Config";
import { CACHE_LIFETIME } from "@env/config";

import { getConfig, saveConfig } from "../git";

let config: Config = null;
let date = +new Date();

app.on("ready", () => {
  ipcMain.on(nameofSends("ON_DRIVE_CONFIG_UPDATE_FINISH"), () => {
    config = null;
  });
  ipcMain.on(nameofSends("ON_COLLECT_FINISH"), () => {
    config = null;
  });
});

ipcMain.handle(
  nameofHandler("GET_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_CONFIG"]>> => {
    const [force] = args;
    if (force || !config || +new Date() > CACHE_LIFETIME + date) {
      config = await getConfig();

      config.repositories.forEach((repository) => {
        repository.exclude = repository.exclude || [];
      });
      config.teams.forEach((team) => {
        team.users = team.users || [];
      });
      config.users.forEach((users) => {
        users.associations = users.associations || [];
      });

      date = +new Date();
    }
    return config;
  }
);

ipcMain.handle(
  nameofHandler("SAVE_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["SAVE_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["SAVE_CONFIG"]>> => {
    const [newConfig] = args;
    await saveConfig(newConfig);
    config = null;
  }
);

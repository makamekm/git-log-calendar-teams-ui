import { ipcMain, app } from "electron";
import md5 from "md5";
import { nameofHandler, IpcHandler, nameofSends, ipc } from "~/shared/ipc";
import { Config } from "~/shared/Config";
import { CACHE_LIFETIME } from "@env/config";

import { getConfig, saveConfig } from "../git";

let config: Config = null;
let date = +new Date();

app.on("ready", () => {
  ipcMain.on(nameofSends("ON_SETTINGS_UPDATE_FINISH"), () => {
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
    ...args: Parameters<IpcHandler["GET_CONFIG"]>
  ): Promise<ReturnType<IpcHandler["GET_CONFIG"]>> => {
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
    ...args: Parameters<IpcHandler["SAVE_CONFIG"]>
  ): Promise<ReturnType<IpcHandler["SAVE_CONFIG"]>> => {
    const [newConfig] = args;
    const oldConfig = await ipc.handlers.GET_CONFIG();
    if (oldConfig.password !== newConfig.password && newConfig.password) {
      newConfig.password = md5(newConfig.password);
    }
    await saveConfig(newConfig);
    config = null;
  }
);

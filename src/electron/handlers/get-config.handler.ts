import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";
import { Config } from "~/shared/Config";

import { getConfig, saveConfig } from "../git";

const REFRESH_CONFIG_TIMEOUT = 1000 * 10;

let config: Config = null;
let date = new Date();

ipcMain.handle(
  nameofHandler("GET_CONFIG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_CONFIG"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_CONFIG"]>> => {
    const [force] = args;
    if (force || !config || +new Date() - +date > REFRESH_CONFIG_TIMEOUT) {
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

      date = new Date();
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

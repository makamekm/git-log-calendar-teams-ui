import { ipcMain } from "electron";
import { writeFileSync } from "fs";
import YAML from "yaml";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";
import { Config } from "~/shared/Config";

import { getConfig, collectUnusedUsers } from "git-log-calendar-teams";

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
      collectUnusedUsers(config);

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
    const oldConfig = await getConfig();

    const configPath = oldConfig.path;
    const newConfigRules = {
      ...oldConfig,
      collectInterval: newConfig.collectInterval || oldConfig.collectInterval,
      repositories: newConfig.repositories || oldConfig.repositories,
      users: newConfig.users || oldConfig.users,
      teams: newConfig.teams || oldConfig.teams,
      evaluate:
        (newConfig.evaluate && newConfig.evaluate.toString()) ||
        (oldConfig.evaluate && oldConfig.evaluate.toString()),
    };

    writeFileSync(configPath, YAML.stringify(newConfigRules), {
      encoding: "utf8",
      flag: "w",
    });

    await ipc.handlers.GET_CONFIG(true);
  }
);

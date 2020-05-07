import { app } from "electron";
import md5 from "md5";
import { nameofHandler, IpcHandler, nameofSends, ipc } from "~/shared/ipc";
import { Config } from "~/shared/Config";
import { CACHE_LIFETIME } from "@env/config";

import { getConfig, saveConfig } from "../modules/git";
import { isDriveWritable } from "../modules/drive";

let config: Config = null;
let date = +new Date();

app.on("ready", () => {
  ipcBus.on(nameofSends("ON_SETTINGS_UPDATE_FINISH"), () => {
    config = null;
  });
  ipcBus.on(nameofSends("ON_COLLECT_FINISH"), () => {
    config = null;
  });
});

ipcBus.handle(
  nameofHandler("GET_CONFIG"),
  async (
    ...args: Parameters<IpcHandler["GET_CONFIG"]>
  ): Promise<ReturnType<IpcHandler["GET_CONFIG"]>> => {
    const [force] = args;
    if (force || !config || +new Date() > CACHE_LIFETIME + date) {
      config = await getConfig();

      config.repositories.forEach((repository) => {
        repository.id = String(Math.random() * 10000);
        repository.exclude = repository.exclude || [];
      });
      config.teams.forEach((team) => {
        team.id = String(Math.random() * 10000);
        team.users = team.users || [];
        team.repositories = team.repositories || [];
      });
      config.users.forEach((user) => {
        user.id = String(Math.random() * 10000);
        user.associations = user.associations || [];
      });

      date = +new Date();
    }
    return config;
  }
);

ipcBus.handle(
  nameofHandler("SAVE_CONFIG"),
  async (
    ...args: Parameters<IpcHandler["SAVE_CONFIG"]>
  ): Promise<ReturnType<IpcHandler["SAVE_CONFIG"]>> => {
    if (!(await isDriveWritable())) {
      return;
    }

    ipc.sends.ON_CONFIG_UPDATE_STARTED();

    const [newConfig] = args;

    newConfig.repositories.forEach((repository) => {
      delete repository.id;
    });
    newConfig.teams.forEach((team) => {
      delete team.id;
    });
    newConfig.users.forEach((user) => {
      delete user.id;
    });

    const oldConfig = await ipc.handlers.GET_CONFIG();
    if (oldConfig.password !== newConfig.password && newConfig.password) {
      newConfig.password = md5(newConfig.password);
    }
    await saveConfig(newConfig);
    config = null;

    ipc.sends.ON_CONFIG_UPDATE_FINISHED();
  }
);

ipcBus.handle(
  nameofHandler("REGISTER_USER"),
  async (
    ...args: Parameters<IpcHandler["REGISTER_USER"]>
  ): Promise<ReturnType<IpcHandler["REGISTER_USER"]>> => {
    const [email, username] = args;
    const name = username
      .toLowerCase()
      .split(" ")
      .map((s) => {
        s = s.trim();
        return s.charAt(0).toUpperCase() + s.slice(0);
      })
      .join(" ");

    const config = await ipc.handlers.GET_CONFIG();
    if (
      !config.users.find(
        (u) =>
          u.name === name ||
          u.associations.includes(email) ||
          u.associations.includes(username)
      )
    ) {
      config.users.unshift({
        id: String(Math.random() * 10000),
        associations: [email, username],
        name,
      });
      await ipc.handlers.SAVE_CONFIG(config);
    }
  }
);

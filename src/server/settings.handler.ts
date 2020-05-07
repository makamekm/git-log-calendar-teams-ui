import fs from "fs";
import path from "path";
import YAML from "yaml";
import { argv } from "yargs";
import { SERVER_SETTINGS } from "@env/config";
import { nameofHandler, IpcHandler } from "~/shared/ipc";

ipcBus.handle(
  nameofHandler("GET_SETTINGS"),
  async (
    ...args: Parameters<IpcHandler["GET_SETTINGS"]>
  ): Promise<ReturnType<IpcHandler["GET_SETTINGS"]>> => {
    const configPath = (argv.path as string) || SERVER_SETTINGS;
    return YAML.parse(fs.readFileSync(path.resolve(configPath), "utf-8"));
  }
);

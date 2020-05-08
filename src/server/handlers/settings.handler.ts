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
    const configPath = path.resolve(
      process.env.SERVER_SETTINGS || (argv.path as string) || SERVER_SETTINGS
    );
    const config = fs.existsSync(configPath)
      ? YAML.parse(fs.readFileSync(configPath, "utf-8"))
      : {};
    return {
      publicKey: process.env.PUBLIC_KEY,
      secretKey: process.env.SECRET_KEY,
      parallelCollectingJobLimit: process.env.PARALLEL_JOB_LIMIT
        ? Number(process.env.PARALLEL_JOB_LIMIT)
        : 1,
      forceCollectingInterval: process.env.FORCE_INTERVAL
        ? Number(process.env.FORCE_INTERVAL)
        : 0,
      limitCollectingRepositoriesPerTry: process.env.JOBS_PER_TRY
        ? Number(process.env.JOBS_PER_TRY)
        : 0,
      collectingRepositoryNames: process.env.REPO_NAMES
        ? JSON.parse(process.env.REPO_NAMES)
        : [],
      drivePath: process.env.DRIVE_PATH || "./drive",
      tempPath: process.env.TEMP_PATH || "./temp",
      ...config,
      useDriveSwarm: true,
      dontCollect: false,
    };
  }
);

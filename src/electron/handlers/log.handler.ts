import { ipcMain } from "electron";
import { nameofHandler, IpcHandler } from "~/shared/ipc";
import { CATCH_LOGS, FILE_LOG_LEVEL, CONSOLE_LOG_LEVEL } from "@env/config";
import readline from "readline";
import fs from "fs";
import "../git-log.hooks";

import log from "electron-log";

log.transports.file.level = FILE_LOG_LEVEL;
log.transports.console.level = CONSOLE_LOG_LEVEL;

if (CATCH_LOGS) {
  Object.assign(console, log.functions);
}

const levels = ["info", "warn", "error", "verbose", "debug", "silly"];

export const getLogPathMain = () =>
  log.transports.file.getFile().path.replace("renderer.log", "main.log");
export const getLogPathRenderer = () =>
  log.transports.file.getFile().path.replace("main.log", "renderer.log");

ipcMain.handle(
  nameofHandler("LOG"),
  async (
    event,
    ...args: Parameters<IpcHandler["LOG"]>
  ): Promise<ReturnType<IpcHandler["LOG"]>> => {
    let [logs, level] = args;
    level = level || "info";

    if (levels.includes(level)) {
      log[level](logs);
    }
  }
);

ipcMain.handle(
  nameofHandler("CLEAR_LOGS"),
  async (
    event,
    ...args: Parameters<IpcHandler["CLEAR_LOGS"]>
  ): Promise<ReturnType<IpcHandler["CLEAR_LOGS"]>> => {
    if (await isFileExist(getLogPathMain())) {
      await removeFile(getLogPathMain());
    }
    if (await isFileExist(getLogPathRenderer())) {
      await removeFile(getLogPathRenderer());
    }
  }
);

const isFileExist = (file) =>
  new Promise((r) =>
    fs.exists(file, (exists) => {
      r(exists);
    })
  );

const removeFile = (file) =>
  new Promise((r, e) =>
    fs.unlink(file, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    })
  );

const searchLinesFile = (
  search: string,
  limit: number,
  file: string
): Promise<string[]> => {
  return new Promise<string[]>(async (r) => {
    const main: string[] = [];

    if (!(await isFileExist(file))) {
      r(main);
      return;
    }

    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });

    let lineCursor = "";

    const readLine = (line) => {
      if (line.charAt(0) === "[") {
        if (!search || lineCursor.includes(search)) {
          main.unshift(lineCursor);
        }
        lineCursor = line;
      } else {
        lineCursor = (lineCursor ? "\n\r" + lineCursor : "") + line;
      }
    };

    const limitResult = () => {
      main.splice(limit, Math.max(0, main.length - limit));
    };

    lineReader.on("close", () => {
      if (lineCursor) {
        if (!search || lineCursor.includes(search)) {
          main.unshift(lineCursor);
        }
      }
      limitResult();
      r(main);
    });

    lineReader.on("line", (line: string) => {
      readLine(line);
      limitResult();
    });
  });
};

ipcMain.handle(
  nameofHandler("GET_LOGS"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_LOGS"]>
  ): Promise<ReturnType<IpcHandler["GET_LOGS"]>> => {
    let [search, limit] = args;
    limit = limit || 100;

    let main: string[] = [];
    let renderer: string[] = [];

    try {
      main = await searchLinesFile(search, limit, getLogPathMain());
    } catch (error) {
      console.log(error);
    }
    try {
      renderer = await searchLinesFile(search, limit, getLogPathRenderer());
    } catch (error) {
      console.log(error);
    }

    return {
      main,
      renderer,
    };
  }
);

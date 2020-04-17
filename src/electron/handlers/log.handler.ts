import { ipcMain } from "electron";
import { nameofHandler, Ipc } from "~/shared/ipc";
import { CATCH_LOGS, FILE_LOG_LEVEL, CONSOLE_LOG_LEVEL } from "@env/config";
import readline from "readline";
import fsReverse from "fs-backwards-stream";

import log from "electron-log";

log.transports.file.level = FILE_LOG_LEVEL;
log.transports.console.level = CONSOLE_LOG_LEVEL;

if (CATCH_LOGS) {
  Object.assign(console, log.functions);
}

const levels = ["info", "warn", "error", "verbose", "debug", "silly"];

export const getLogPathMain = () => log.transports.file.getFile().path;
export const getLogPathRenderer = () =>
  log.transports.file.getFile().path.replace("main.log", "renderer.log");

ipcMain.handle(
  nameofHandler("LOG"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["LOG"]>
  ): Promise<ReturnType<Ipc["handlers"]["LOG"]>> => {
    let [logs, level] = args;
    level = level || "info";

    if (levels.includes(level)) {
      log[level](logs);
    }
  }
);

const searchLinesFile = (
  search: string,
  limit: number,
  file: string
): Promise<string[]> => {
  return new Promise<string[]>((r) => {
    const main: string[] = [];
    const lineReader = readline.createInterface({
      input: fsReverse(file),
    });

    let lineCursor = "";

    lineReader.on("close", () => {
      if (lineCursor) {
        if (!search || lineCursor.indexOf(search) >= 0) {
          main.push(lineCursor);
        }
      }
      r(main);
    });

    lineReader.on("line", (line) => {
      if (line[0] === "[") {
        if (main.length > limit) {
          lineReader.close();
        } else if (!search || lineCursor.indexOf(search) >= 0) {
          main.push(lineCursor);
        }
        lineCursor = line;
      } else {
        lineCursor += "\n\r" + line;
      }
    });
  });
};

ipcMain.handle(
  nameofHandler("GET_LOGS"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_LOGS"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_LOGS"]>> => {
    let [search, limit] = args;
    limit = limit || 100;

    const main = await searchLinesFile(search, limit, getLogPathMain());
    const renderer = await searchLinesFile(search, limit, getLogPathRenderer());

    return {
      main,
      renderer,
    };
  }
);

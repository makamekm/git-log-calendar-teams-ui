import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { readData } from "git-log-calendar-teams";

ipcMain.handle(
  nameofHandler("GET_CALENDAR_TEAM"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_CALENDAR_TEAM"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_CALENDAR_TEAM"]>> => {
    const { fileMap, config } = await readData();
    console.log(4324324);

    return [];
  }
);

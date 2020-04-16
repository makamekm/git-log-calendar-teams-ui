import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { normalizeCalendarData } from "git-log-calendar-teams";

ipcMain.handle(
  nameofHandler("GET_CALENDAR_DATA"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_CALENDAR_DATA"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_CALENDAR_DATA"]>> => {
    const [limit] = args;

    const config = await ipc.handlers.GET_CONFIG();
    const fileMap = await ipc.handlers.GET_DATA();

    const report = {
      limit,
      // compareTeams: ["others"],
      // compareUsers: ["user"],
    };

    const { teamDates } = normalizeCalendarData(report, fileMap, config);

    return teamDates;
  }
);

import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { normalizeCalendarData } from "git-log-calendar-teams";

ipcMain.handle(
  nameofHandler("GET_CALENDAR_DATA"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_CALENDAR_DATA"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_CALENDAR_DATA"]>> => {
    const [returnMode, { limit, mode, name }] = args;

    const config = await ipc.handlers.GET_CONFIG();
    const fileMap = await ipc.handlers.GET_DATA();

    const report: any = {
      limit,
    };

    if (mode === "repository") {
      report.repositories = [name];
    } else if (mode === "team") {
      report.teams = [name];
    } else if (mode === "user") {
      report.users = [name];
    }

    const { teamDates, userDates, repositoriesDates } = normalizeCalendarData(
      report,
      fileMap,
      config
    );

    if (returnMode === "repositories") {
      return repositoriesDates;
    } else if (returnMode === "teams") {
      return teamDates;
    } else if (returnMode === "users") {
      return userDates;
    }
  }
);

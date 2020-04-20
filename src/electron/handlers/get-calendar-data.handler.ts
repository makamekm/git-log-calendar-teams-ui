import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { normalizeCalendarData } from "git-log-calendar-teams";

ipcMain.handle(
  nameofHandler("GET_CALENDAR_DATA"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_CALENDAR_DATA"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_CALENDAR_DATA"]>> => {
    const [limit, mode] = args;

    const config = await ipc.handlers.GET_CONFIG();
    const fileMap = await ipc.handlers.GET_DATA();

    const report = {
      limit,
    };

    const { teamDates, userDates, repositoriesDates } = normalizeCalendarData(
      report,
      fileMap,
      config
    );

    if (mode === "repositories") {
      return repositoriesDates;
    } else if (mode === "teams") {
      return teamDates;
    } else if (mode === "users") {
      return userDates;
    }
  }
);

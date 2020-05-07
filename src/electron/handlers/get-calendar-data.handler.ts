import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";

import { normalizeCalendarData } from "../modules/git";

ipcBus.handle(
  nameofHandler("GET_CALENDAR_DATA"),
  async (
    ...args: Parameters<IpcHandler["GET_CALENDAR_DATA"]>
  ): Promise<ReturnType<IpcHandler["GET_CALENDAR_DATA"]>> => {
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

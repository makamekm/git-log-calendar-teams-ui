import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { getAllRepositoryUsers } from "git-log-calendar-teams";

ipcMain.handle(
  nameofHandler("GET_REPOSITORY_USERS"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_REPOSITORY_USERS"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_REPOSITORY_USERS"]>> => {
    const [names] = args;

    const config = await ipc.handlers.GET_CONFIG();
    const fileMap = await ipc.handlers.GET_DATA();

    return getAllRepositoryUsers(names, fileMap, config);
  }
);

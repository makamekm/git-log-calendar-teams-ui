import { ipcMain } from "electron";
import { nameofHandler, Ipc, ipc } from "~/shared/ipc";

import { searchCommitMessages } from "git-log-calendar-teams";

ipcMain.handle(
  nameofHandler("GET_MESSAGES"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["GET_MESSAGES"]>
  ): Promise<ReturnType<Ipc["handlers"]["GET_MESSAGES"]>> => {
    const [{ query, limit, maxMessages, mode, name }] = args;

    const config = await ipc.handlers.GET_CONFIG();
    const fileMap = await ipc.handlers.GET_DATA();

    const report: any = {
      limit,
      maxMessages,
      query,
    };

    if (mode === "repository") {
      report.repositories = [name];
    } else if (mode === "team") {
      report.teams = [name];
    } else if (mode === "user") {
      report.users = [name];
    }

    return searchCommitMessages(report, fileMap, config).map((r) => ({
      message: r.message,
      user: r.userKey,
      value: r.value,
      date: r.timestamp,
      repository: r.repository,
    }));
  }
);

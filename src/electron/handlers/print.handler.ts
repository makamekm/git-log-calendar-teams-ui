import { ipcMain } from "electron";
import { nameofHandler, IpcHandler } from "~/shared/ipc";
import { getWindow } from "../main";

ipcMain.handle(
  nameofHandler("PRINT"),
  async (
    event,
    ...args: Parameters<IpcHandler["PRINT"]>
  ): Promise<ReturnType<IpcHandler["PRINT"]>> => {
    await getWindow().webContents.print();
  }
);

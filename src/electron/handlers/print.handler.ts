import { ipcMain } from "electron";
import { nameofHandler, Ipc } from "~/shared/ipc";
import { getWindow } from "../main";

ipcMain.handle(
  nameofHandler("PRINT"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["PRINT"]>
  ): Promise<ReturnType<Ipc["handlers"]["PRINT"]>> => {
    await getWindow().webContents.print();
  }
);

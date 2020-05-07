import { nameofHandler, IpcHandler } from "~/shared/ipc";
import { getWindow } from "../main";

ipcBus.handle(
  nameofHandler("PRINT"),
  async (
    ...args: Parameters<IpcHandler["PRINT"]>
  ): Promise<ReturnType<IpcHandler["PRINT"]>> => {
    await getWindow().webContents.print();
  }
);

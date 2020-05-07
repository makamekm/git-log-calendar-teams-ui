import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";
import { getConfig } from "~/electron/modules/git";

ipcBus.handle(
  nameofHandler("GET_CONFIG"),
  async (
    ...args: Parameters<IpcHandler["GET_CONFIG"]>
  ): Promise<ReturnType<IpcHandler["GET_CONFIG"]>> => {
    const settings = await ipc.handlers.GET_SETTINGS();
    return await getConfig(settings.tempPath);
  }
);

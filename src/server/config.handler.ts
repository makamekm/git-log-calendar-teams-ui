import { nameofHandler, IpcHandler, ipc } from "~/shared/ipc";
import { getConfig } from "~/electron/modules/git";

bus.handle(
  nameofHandler("GET_CONFIG"),
  async (
    event,
    ...args: Parameters<IpcHandler["GET_CONFIG"]>
  ): Promise<ReturnType<IpcHandler["GET_CONFIG"]>> => {
    const settings = await ipc.handlers.GET_SETTINGS();
    return await getConfig(settings.tempPath);
  }
);

import { app, ipcMain } from "electron";
import { nameofHandler, IpcHandler } from "~/shared/ipc";
// import { writeFile, readFile } from "../drive";

ipcMain.handle(
  nameofHandler("APP_INFO"),
  async (
    event,
    ...args: Parameters<IpcHandler["APP_INFO"]>
  ): Promise<ReturnType<IpcHandler["APP_INFO"]>> => {
    // await writeFile("/test.txt", "hello");
    // await writeFile("/test.txt", "hello");
    // await writeFile("/test.txt", "hello");
    // console.log(await readFile("/test.txt"));
    await new Promise((r) => setTimeout(r, 1000));
    return {
      appName: app.getName(),
      appVersion: app.getVersion(),
    };
  }
);

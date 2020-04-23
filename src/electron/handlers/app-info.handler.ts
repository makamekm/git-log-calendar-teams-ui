import { app, ipcMain } from "electron";
import { nameofHandler, Ipc } from "~/shared/ipc";
// import { writeFile, readFile } from "../drive";

ipcMain.handle(
  nameofHandler("APP_INFO"),
  async (
    event,
    ...args: Parameters<Ipc["handlers"]["APP_INFO"]>
  ): Promise<ReturnType<Ipc["handlers"]["APP_INFO"]>> => {
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

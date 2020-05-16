import fs from "fs";
import path from "path";
import { dialog, app } from "electron";
import { nameofHandler, IpcHandler } from "~/shared/ipc";
import { getWindow } from "../main";

ipcBus.handle(
  nameofHandler("PRINT"),
  async (
    ...args: Parameters<IpcHandler["PRINT"]>
  ): Promise<ReturnType<IpcHandler["PRINT"]>> => {
    await new Promise((r) =>
      getWindow().webContents.print({}, (err) => {
        if (err) {
          console.error(err);
        }
        r();
      })
    );
  }
);

ipcBus.handle(
  nameofHandler("PRINT_PDF"),
  async (
    ...args: Parameters<IpcHandler["PRINT_PDF"]>
  ): Promise<ReturnType<IpcHandler["PRINT_PDF"]>> => {
    let [title] = args;
    const pdfPath = await dialog.showSaveDialog(getWindow(), {
      title: "Save PDF",
      defaultPath: path.resolve(
        app.getPath("home"),
        (title || "Report") + ".pdf"
      ),
      filters: [{ name: "PDF", extensions: ["pdf"] }],
    });
    if (pdfPath.filePath) {
      await getWindow()
        .webContents.printToPDF({
          pageSize: "A4",
        })
        .then((data) => {
          fs.writeFile(pdfPath.filePath, data, (error) => {
            if (error) {
              console.error(error);
            } else {
              console.log("Write PDF successfully.");
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
);

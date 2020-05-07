import { IpcRenderer, Renderer } from "electron";

declare var ipcBus: IpcRenderer;
declare var remote: Renderer;
declare var mainWindow: BrowserWindow;

declare global {
  var ipcBus: IpcRenderer;
  var remote: Renderer;
  var mainWindow: BrowserWindow;

  namespace NodeJS {
    interface Global {
      ipcBus: IpcRenderer;
      remote: Renderer;
      mainWindow: BrowserWindow;
    }
  }
}

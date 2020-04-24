import { IpcRenderer, Renderer } from "electron";

declare var ipcRenderer: IpcRenderer;
declare var remote: Renderer;
declare var mainWindow: BrowserWindow;

declare global {
  var ipcRenderer: IpcRenderer;
  var remote: Renderer;
  var mainWindow: BrowserWindow;

  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
      remote: Renderer;
      mainWindow: BrowserWindow;
    }
  }
}

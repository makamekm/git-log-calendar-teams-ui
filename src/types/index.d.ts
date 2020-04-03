import { IpcRenderer, Renderer } from "electron";

declare var ipcRenderer: IpcRenderer;
declare var remote: Renderer;

declare global {
  var ipcRenderer: IpcRenderer;
  var remote: Renderer;

  namespace NodeJS {
    interface Global {
      ipcRenderer: IpcRenderer;
      remote: Renderer;
    }
  }
}

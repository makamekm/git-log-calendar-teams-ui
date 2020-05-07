import { IpcRenderer, Renderer } from "electron";

declare var ipcBus: IpcRenderer;
declare var remote: Renderer;
declare var mainWindow: BrowserWindow;

declare class IPCBus extends EventEmitter implements IpcRenderer {}

declare global {
  var ipcBus: IpcRenderer;
  var remote: Renderer;
  var mainWindow: BrowserWindow;

  namespace NodeJS {
    interface Global {
      bus: IPCBus;
      ipcBus: IpcRenderer;
      remote: Renderer;
      mainWindow: BrowserWindow;
    }
  }
}

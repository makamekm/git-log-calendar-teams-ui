import { IpcRenderer } from "electron";

declare global {
  declare var ipcRenderer: IpcRenderer;
}

import { IpcRenderer } from "electron";
import { IPCBus } from "./IPCBus";

declare global {
  var ipcBus: IpcRenderer;
  var bus: IPCBus;
}

const bus = new IPCBus();
(global as any).bus = bus;
(global as any).ipcBus = bus;

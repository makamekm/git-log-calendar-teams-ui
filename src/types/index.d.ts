import { IPCBus } from "~/shared/IPCBus";

declare var ipcBus: IPCBus;

declare global {
  var ipcBus: IPCBus;
}

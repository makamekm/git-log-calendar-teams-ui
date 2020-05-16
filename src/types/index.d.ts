import { IPCBus } from "~/shared/IPCBus";

declare var ipcBus: IPCBus;
declare var isElectron: boolean;

declare global {
  var ipcBus: IPCBus;
  var isElectron: boolean;
}

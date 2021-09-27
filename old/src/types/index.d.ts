import { IPCBus } from "~/shared/IPCBus";

declare var ipcBus: IPCBus;
declare var isElectron: boolean;
declare var isConnecting: boolean;

declare global {
  var ipcBus: IPCBus;
  var isElectron: boolean;
  var isConnecting: boolean;
}

import { IPCBus } from "./IPCBus";

const bus = new IPCBus();

globalThis.ipcBus = bus;

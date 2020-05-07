import { IpcRenderer } from "electron";
import { EventEmitter } from "events";

export class IPCBus extends EventEmitter implements IpcRenderer {
  send = (channel, ...args) => {};
  sendSync = (channel, ...args) => {};
  sendToHost = (channel, ...args) => {};
  sendTo = (channel, ...args) => {};
  fnMap = new Map<string, (event, ...args) => any>();
  handle = (name, fn) => {
    this.fnMap.set(name, fn);
  };
  invoke = async (channel, ...args): Promise<any> => {
    const fn = this.fnMap.get(channel);
    return await fn(null, ...args);
  };
}

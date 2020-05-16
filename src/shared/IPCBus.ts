import { EventEmitter } from "events";

declare global {
  var ipcBus: IPCBus;
}

export class IPCBus extends EventEmitter {
  fnMap = new Map<string, (...args) => any>();
  handle = (name, fn) => {
    this.fnMap.set(name, fn);
  };
  invoke = async (channel: string, ...args): Promise<any> => {
    const fn = this.fnMap.get(channel);
    if (!fn) {
      throw Error("Handler has not been registered; " + channel);
    }
    return await fn(...args);
  };
  send = (channel: string, ...args) => {
    this.emit(channel, ...args);
  };
  subscribe = (
    channel: string,
    callback: (...args: any[]) => void
  ): (() => void) => {
    const listener = (...args) => {
      callback(...args);
    };
    this.on(channel, listener);
    return () => this.removeListener(channel, listener);
  };
}

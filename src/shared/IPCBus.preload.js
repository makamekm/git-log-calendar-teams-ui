const { EventEmitter } = require("events");

module.exports = class IPCBus extends EventEmitter {
  fnMap = new Map();
  handle = (name, fn) => {
    this.fnMap.set(name, fn);
  };
  invoke = async (channel, ...args) => {
    const fn = this.fnMap.get(channel);
    return await fn(...args);
  };
  send = (channel, ...args) => {
    this.emit(channel, ...args);
  };
  subscribe = (channel, callback) => {
    const listener = (...args) => {
      callback(...args);
    };
    this.on(channel, listener);
    return () => this.removeListener(channel, listener);
  };
};

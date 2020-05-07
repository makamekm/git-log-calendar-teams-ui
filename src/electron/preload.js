// START - Renderer Bus

require("../shared/Bus.preload");

const { ipcRenderer } = require("electron");

global.ipcBus.handle = async (channel, fn) => {
  throw new Error("You cannot handle from Renderer thread");
};
global.ipcBus.send = (channel, ...args) => {
  throw new Error("You cannot send from Renderer thread");
};

global.ipcBus.invoke = (channel, ...args) => {
  return ipcRenderer.invoke(channel, ...args);
};

global.ipcBus.subscribe = (channel, callback) => {
  const listener = (_event, ...args) => {
    callback(...args);
  };
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.removeListener(channel, listener);
};

// END - Renderer Bus

// Setup the application

require("./git-log.hooks");

const log = require("electron-log");
window.log = log.functions;
window.console = log.functions;

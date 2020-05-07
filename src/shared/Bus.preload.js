const IPCBus = require("./IPCBus.preload");

const bus = new IPCBus();

window.ipcBus = bus;

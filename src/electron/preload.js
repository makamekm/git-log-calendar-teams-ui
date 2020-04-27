const { ipcRenderer, remote } = require("electron");
window.ipcRenderer = ipcRenderer;
window.remote = remote;

// const log = require("electron-log");
// window.log = log.functions;
// window.console = log.functions;

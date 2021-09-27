// START - Main Bus

require("../shared/Bus");

const { ipcMain } = require("electron");

global.ipcBus._handle = global.ipcBus.handle;
global.ipcBus.handle = async (channel, fn) => {
  global.ipcBus._handle(channel, fn);
  ipcMain.handle(channel, (_event, ...args) => fn(...args));
};

global.ipcBus._send = global.ipcBus.send;
global.ipcBus.send = (channel, ...args) => {
  global.ipcBus._send(channel, ...args);
  global.mainWindow && global.mainWindow.webContents.send(channel, ...args);
};

// END - Main Bus

// Run the application

require("./main");

function requireFolder(name) {
  const normalizedPath = require("path").join(__dirname, name);

  require("fs")
    .readdirSync(normalizedPath)
    .forEach((file) => {
      require(`./${name}/` + file);
    });
}

requireFolder("handlers");

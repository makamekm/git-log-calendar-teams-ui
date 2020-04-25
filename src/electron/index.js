const { ipcMain } = require("electron");
global.ipcRenderer = ipcMain;

global.ipcRenderer.invoke = async (channel, ...args) => {
  const responce = await new Promise((r, e) => {
    const event = {
      _reply: (result) => r({ result }),
      _throw: (error) => {
        console.error(`Error occurred in handler for '${channel}':`, error);
        r({ error: error.toString() });
      },
    };
    ipcMain._invokeHandlers.get(channel)(event, ...args);
  });
  if (responce.result) {
    if (responce.error) {
      console.error(responce.error);
    }
    return responce.result;
  } else if (responce.error) {
    throw new Error(responce.error);
  }
};

global.ipcRenderer.send = (channel, ...args) => {
  const res = ipcMain.emit(channel, {}, ...args);
  global.mainWindow && global.mainWindow.webContents.send(channel, ...args);
  return res;
};

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

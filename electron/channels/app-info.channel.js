const { app, ipcMain } = require("electron");
const { channels } = require("../../src/shared/constants");

ipcMain.on(channels.APP_INFO, event => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion()
  });
});

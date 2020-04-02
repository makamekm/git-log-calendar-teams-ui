const { app, ipcMain } = require("electron");
const { channels } = require("../../src/shared/constants");

ipcMain.handle(channels.APP_INFO, async (event, ...args) => {
  await new Promise(r => setTimeout(r, 1000));
  return {
    appName: app.getName(),
    appVersion: app.getVersion()
  };
});

import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  MenuItem,
  powerSaveBlocker,
  protocol,
  dialog,
} from "electron";
import settings from "electron-settings";
import contextMenu from "electron-context-menu";
import path from "path";
import url from "url";
import { ipc, nameofSends } from "~/shared/ipc";
import {
  OPEN_MAIN_WINDOW_ON_LOAD,
  OPEN_MAIN_WINDOW_DEV_TOOLS,
} from "@env/config";
import commandExists from "command-exists";

import "./modules/drive";
import "./modules/web-server";

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') { app.quit() }
// })

// // Load here all startup windows
// require('./mainWindow')

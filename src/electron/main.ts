import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  IpcRenderer,
  ipcMain,
  MenuItem,
  powerSaveBlocker,
} from "electron";
import path from "path";
import url from "url";
import { ipc, nameofSends } from "~/shared/ipc";
import {
  OPEN_MAIN_WINDOW_ON_LOAD,
  OPEN_MAIN_WINDOW_DEV_TOOLS,
} from "@env/config";
import { AppUpdater } from "./updater";

powerSaveBlocker.start("prevent-app-suspension");

app.dock.hide();

declare global {
  var ipcRenderer: IpcRenderer;
}

let mainWindow: BrowserWindow;
let tray: Tray;
let updater: AppUpdater;

const openWindow = () => {
  if (mainWindow == null) {
    createWindow();
  } else {
    mainWindow.focus();
  }
};

function createUpdater() {
  updater = new AppUpdater();
}

function createTray() {
  tray = new Tray(path.resolve("./public/iconTemplate.png"));
  const collectButton = new MenuItem({
    label: "Collect Logs",
    type: "normal",
    click: async () => {
      try {
        await ipc.handlers.COLLECT_STATS();
      } catch (error) {
        console.error(error);
      }
    },
  });

  ipcMain.on(nameofSends("ON_COLLECT_STATS"), (_, value) => {
    collectButton.enabled = !value;
  });

  const contextMenu = Menu.buildFromTemplate([
    collectButton,
    {
      label: "Open Log Manager",
      type: "normal",
      click: openWindow,
    },
    {
      label: "Quit",
      type: "normal",
      click: async () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Git Log Manager");
  tray.setContextMenu(contextMenu);
  tray.addListener("double-click", openWindow);
}

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    icon: path.join("./public/logo.png"),
    title: "Git Log Manager",
    width: 1366,
    height: 768,
    minWidth: 1366,
    minHeight: 768,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(startUrl);
  app.dock.show();
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.dock.hide();
  });
  if (OPEN_MAIN_WINDOW_DEV_TOOLS) {
    mainWindow.webContents.openDevTools();
  }
}

app.on("ready", () => {
  createTray();
  createUpdater();
  if (OPEN_MAIN_WINDOW_ON_LOAD) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow != null) {
    mainWindow.focus();
  } else if (OPEN_MAIN_WINDOW_ON_LOAD) {
    createWindow();
  }
});

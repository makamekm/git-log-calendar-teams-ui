import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  IpcRenderer,
  ipcMain,
  MenuItem,
  powerSaveBlocker,
  protocol,
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

if (app.dock) {
  app.dock.hide();
}

declare global {
  var ipcRenderer: IpcRenderer;
}

let mainWindow: BrowserWindow;
let tray: Tray;

const openWindow = () => {
  if (mainWindow == null) {
    createWindow();
  } else {
    mainWindow.focus();
  }
};

function createUpdater() {
  new AppUpdater();
}

function createTray() {
  tray = new Tray(path.join(__dirname, "../assets/iconTemplate.png"));
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
    {
      label: "Open Log Manager",
      type: "normal",
      click: openWindow,
    },
    collectButton,
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
      pathname: "index.html",
      protocol: "file",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../assets/logo.png"),
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
  if (app.dock) {
    app.dock.show();
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
    if (app.dock) {
      app.dock.hide();
    }
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
  if (!process.env.ELECTRON_START_URL) {
    protocol.interceptFileProtocol(
      "file",
      (request, callback) => {
        const url = request.url.substr(7);
        callback(path.normalize(`${__dirname}/../../${url}`));
      },
      (err) => {
        if (err) {
          console.error("Failed to register protocol");
        }
      }
    );
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

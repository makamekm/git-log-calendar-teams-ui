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
  dialog,
  systemPreferences,
} from "electron";
import path from "path";
import http from "http";
import url from "url";
import HyperswarmServer from "hyperswarm-proxy-ws/server";
import { ipc, nameofSends } from "~/shared/ipc";
import {
  OPEN_MAIN_WINDOW_ON_LOAD,
  OPEN_MAIN_WINDOW_DEV_TOOLS,
} from "@env/config";
import commandExists from "command-exists";
import { AppUpdater } from "./updater";
import { createDrive } from "./drive";
import settings from "electron-settings";

const isWin = process.platform !== "darwin";

declare global {
  var ipcRenderer: IpcRenderer;
}

declare global {
  namespace NodeJS {
    interface Global {
      mainWindow: BrowserWindow;
    }
  }
}

powerSaveBlocker.start("prevent-app-suspension");

let isQuiting;

app.on("before-quit", function () {
  isQuiting = true;
});

if (!isWin) {
  app.dock.hide();
}

let mainWindow: BrowserWindow;
let tray: Tray;

export const getWindow = () => {
  return mainWindow;
};

function createUpdater() {
  new AppUpdater();
}

function createTray() {
  tray = new Tray(
    isWin
      ? path.join(__dirname, "../assets/icon.png")
      : path.join(__dirname, "../assets/iconTemplate.png")
  );
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
      label: "Open Stats Manager",
      type: "normal",
      click: () => createWindow(),
    },
    collectButton,
    {
      label: "Quit",
      type: "normal",
      click: async () => {
        isQuiting = true;
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Git Stats Manager");
  tray.setContextMenu(contextMenu);
  tray.addListener("click", () => {
    tray.popUpContextMenu();
  });
  tray.addListener("double-click", () => createWindow());
}

function createWindow() {
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: "index.html",
      protocol: "file",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "../assets/logo.png"),
    title: "Git Stats Manager",
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    fullscreen: !isWin,
    resizable: true,
    center: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(startUrl);
  if (!isWin) {
    app.dock.show();
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
    global.mainWindow = null;
    if (!isWin) {
      app.dock.hide();
    }
  });
  if (OPEN_MAIN_WINDOW_DEV_TOOLS) {
    mainWindow.webContents.openDevTools();
  }
  if (isWin) {
    mainWindow.on("close", (event) => {
      if (!isQuiting) {
        event.preventDefault();
        mainWindow.hide();
        event.returnValue = false;
      }
    });
  }
  global.mainWindow = mainWindow;
  if (isWin) {
    mainWindow.maximize();
  }
}

export const gatherAccess = async () => {
  // if (!(await systemPreferences.askForMediaAccess("camera"))) {
  //   app.exit(1);
  // }
  // if (!(await systemPreferences.askForMediaAccess("microphone"))) {
  //   app.exit(1);
  // }
};

app.on("ready", () => {
  commandExists("git", async (err, commandExists) => {
    if (!commandExists) {
      dialog.showMessageBoxSync({
        type: "error",
        message: "You need to install GIT first before starting Git Manager!",
      });
      app.exit();
    } else {
      await gatherAccess();
      settings.setPath(path.resolve(app.getPath("userData"), "settings.json"));
      createDrive();
      createTray();
      createUpdater();
      if (OPEN_MAIN_WINDOW_ON_LOAD) {
        createWindow();
      }
      createHyperProtocol();
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
    }
  });
});

const createHyperProtocol = async () => {
  const server = http.createServer((req, res) => {
    res.end("pong");
  });

  const port = 4977;
  await server.listen(4977, "127.0.0.1");
  const wsServer = new HyperswarmServer();
  wsServer.listenOnServer(server);

  const url = "http://127.0.0.1:" + port;
  await protocol.registerHttpProtocol("hyperswarm", (request, callback) => {
    return callback({ url });
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   if (mainWindow != null) {
//     mainWindow.focus();
//   } else if (OPEN_MAIN_WINDOW_ON_LOAD) {
//     createWindow();
//   }
// });

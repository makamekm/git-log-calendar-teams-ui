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

import "./modules/updater";
import "./modules/drive";
import "./modules/web-server";

declare global {
  namespace NodeJS {
    interface Global {
      mainWindow: BrowserWindow;
    }
  }
}

const isWin = process.platform !== "darwin";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = settings.get(
  "ignoreSSLCertificate"
)
  ? "0"
  : "1";

powerSaveBlocker.start("prevent-app-suspension");

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
  process.exit(1);
}

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

contextMenu({
  showSearchWithGoogle: false,
  showCopyImageAddress: false,
  showSaveImage: true,
  showSaveImageAs: true,
  // shouldShowMenu: (event, params) => {
  //   const createUser = params.linkURL && decodeURIComponent(params.linkURL);
  //   return !!createUser || params.isEditable;
  // },
  prepend: (defaultActions, params, browserWindow) => {
    const str = params.linkURL && decodeURIComponent(params.linkURL);
    const createUser =
      str && /user\/.*\*$/gi.test(decodeURIComponent(params.linkURL));
    if (createUser) {
      const arr = /user\/([a-zA-Z0-9_\-.]+@[a-zA-Z0-9_\-.]+) (.*)\*$/gi.exec(
        str
      );
      if (arr && arr[1] && arr[2]) {
        const email = arr[1];
        const username = arr[2];
        return [
          {
            label: "Register user",
            visible: /user\/.*\*$/gi.test(decodeURIComponent(params.linkURL)),
            click: async () => {
              await ipc.handlers.REGISTER_USER(email, username);
            },
          },
        ];
      } else {
        const email = str.trim();
        const username = email.split("@")[0];
        return [
          {
            label: "Register user",
            visible: /user\/.*\*$/gi.test(decodeURIComponent(params.linkURL)),
            click: async () => {
              await ipc.handlers.REGISTER_USER(email, username);
            },
          },
        ];
      }
    }
    return [];
  },
  menu: (actions) => [actions.copy({}), actions.paste({})],
});

function createTray() {
  tray = new Tray(
    isWin
      ? path.join(__dirname, "../assets/icon.png")
      : path.join(__dirname, "../assets/iconTemplate.png")
  );
  const collectButton = new MenuItem({
    label: "Collect Stats",
    type: "normal",
    click: async () => {
      try {
        await ipc.handlers.COLLECT_STATS();
      } catch (error) {
        console.error(error);
      }
    },
  });

  ipcBus.on(nameofSends("ON_COLLECT_STATS"), (value) => {
    collectButton.enabled = !value;
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Manager",
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
  tray.setToolTip("Git Activity Team Tracker");
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
    title: "Git Activity Team Tracker",
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
      createTray();
      if (OPEN_MAIN_WINDOW_ON_LOAD || settings.get("openWindowOnStart")) {
        createWindow();
      }
      if (!process.env.ELECTRON_START_URL) {
        protocol.interceptFileProtocol(
          "file",
          (request, callback) => {
            const url = request.url.substr(7).split("#")[0];
            callback(path.normalize(`${__dirname}/../../${url}`));
          },
          (err) => {
            if (err) {
              console.error("Failed to register protocol");
            }
          }
        );
      }
      ipcBus.emit("ready");
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

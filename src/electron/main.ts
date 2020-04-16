import { app, BrowserWindow, Tray, Menu, IpcRenderer } from "electron";
import path from "path";
import url from "url";
// import { ipc } from "~/shared/ipc";

app.dock.hide();
// app.setName("Git Log Manager");

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

function createTray() {
  if (tray) {
    return;
  }
  tray = new Tray(path.resolve("./public/iconTemplate.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Collect Logs",
      type: "normal",
      click: async () => {
        // ipc.handlers.APP_INFO
      },
    },
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
}

app.on("ready", () => {
  createTray();
  if (process.env.NODE_ENV === "development") {
    // createWindow();
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
  }
});

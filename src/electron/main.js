require('ts-node').register({
  compilerOptions: {
    module: "commonjs",
  }
});

const { ipcMain } = require("electron");
global.ipcRenderer = ipcMain;

require("./main.ts");

function requireFolder(name) {
  const normalizedPath = require("path").join(__dirname, name);

  require("fs")
    .readdirSync(normalizedPath)
    .forEach((file) => {
      require(`./${name}/` + file);
    });
}

requireFolder("handlers");
requireFolder("channels");

try {
  require("electron-reloader")(module);
} catch (_) {}
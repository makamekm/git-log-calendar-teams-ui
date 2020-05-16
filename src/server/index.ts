import { argv } from "yargs";

import "~/shared/Bus";
import "./handlers/settings.handler";
import "~/electron/handlers/get-config.handler";
import "~/electron/handlers/app-info.handler";
import "~/electron/handlers/get-calendar-data.handler";
import "~/electron/handlers/get-data.handler";
import "~/electron/handlers/get-messages.handler";
import "~/electron/handlers/get-repository-users.handler";
import "~/electron/handlers/get-stats-data.handler";
import "~/electron/handlers/collect-stats.handler";

import { createDrive, getDrive } from "~/electron/modules/drive";
import { runWebServer } from "./web-server";

run();

async function run() {
  await createDrive();
  console.log("started!");

  setInterval(() => {
    const drive = getDrive();
    if (!drive.live) {
      process.exit(0);
    }
  }, 1000);

  if (argv.web) {
    let port = Number(argv.web);
    port = port === 1 ? 8080 : port || 8080;
    runWebServer(port);
  }

  ipcBus.send("ready");
}

import "~/shared/Bus";
import "./handlers/app-info.handler";
import "./handlers/settings.handler";
import "~/electron/handlers/get-config.handler";
import "~/electron/handlers/get-calendar-data.handler";
import "~/electron/handlers/get-data.handler";
import "~/electron/handlers/get-messages.handler";
import "~/electron/handlers/get-repository-users.handler";
import "~/electron/handlers/get-stats-data.handler";
import "~/electron/handlers/collect-stats.handler";

import { getDrive } from "~/electron/modules/drive";
import "~/electron/modules/web-server";
import { ipc } from "~/shared/ipc";

run();

async function run() {
  console.log("started!");
  const settings = await ipc.handlers.GET_SETTINGS();

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = settings.ignoreSSLCertificate
    ? "0"
    : "1";

  setInterval(() => {
    const drive = getDrive();
    if (!drive.live) {
      process.exit(0);
    }
  }, 1000);

  ipcBus.send("ready");
}

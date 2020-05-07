import "~/shared/Bus";
import "./handlers/settings.handler";
import "./handlers/config.handler";

import { createDrive, getDrive } from "~/electron/modules/drive";
import { runCollectJob } from "./modules/collect.job";

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

  runCollectJob();
}

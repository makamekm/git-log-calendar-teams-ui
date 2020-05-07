import { ipc } from "~/shared/ipc";
import { collect } from "~/electron/modules/git";
import { isDriveWritable } from "~/electron/modules/drive";

export const runCollectJob = async () => {
  let inited = false;
  const runTimeout = async () => {
    const { interval, settings } = await getInterval();
    const canCollect = async () =>
      !settings.dontCollect && (await isDriveWritable());
    if (!inited) {
      inited = true;
      if (await canCollect()) {
        runCollect();
      } else {
        console.log("haven't rules to collect");
      }
    }
    setTimeout(async () => {
      if (await canCollect()) {
        runCollect();
      } else {
        console.log("haven't rules to collect");
      }
      runTimeout();
    }, interval * 1000 * 60);
  };
  runTimeout();
};

const getInterval = async () => {
  let interval: number;
  const settings = await ipc.handlers.GET_SETTINGS();
  if (
    settings.forceCollectingInterval &&
    settings.forceCollectingInterval > 0
  ) {
    interval = settings.forceCollectingInterval;
  } else {
    try {
      const config = await ipc.handlers.GET_CONFIG();
      interval = config.collectInterval;
    } catch (error) {
      console.error(error);
    }
  }
  return {
    interval: interval || 60,
    settings,
  };
};

let isCollecting = false;

const runCollect = async () => {
  if (isCollecting) {
    return;
  }

  isCollecting = true;
  console.log("collecting stats started!");
  const config = await ipc.handlers.GET_CONFIG();
  const settings = await ipc.handlers.GET_SETTINGS();
  try {
    if (!settings.dontCollect && (await isDriveWritable())) {
      await collect(
        config,
        Math.max(1, settings.parallelCollectingJobLimit),
        settings.collectingRepositoryNames,
        settings.limitCollectingRepositoriesPerTry
      );
    }
  } catch (error) {
    console.error(error);
  }
  console.log("collecting stats finished!");
  isCollecting = false;
};

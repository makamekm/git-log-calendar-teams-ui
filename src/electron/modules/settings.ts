import { app } from "electron";
import path from "path";
import settings from "electron-settings";
import { ApplicationSettings } from "~/shared/Settings";
import { generateDriveKeys } from "~/tools";

export const getSettings = async (): Promise<ApplicationSettings> => {
  return {
    publicKey: settings.get("publicKey"),
    secretKey: settings.get("secretKey"),
    useDriveSwarm: settings.get("useDriveSwarm"),
    dontCollect: settings.get("dontCollect"),
    parallelCollectLimit: settings.get("parallelCollectLimit") || 1,
    forceCollectingInterval: settings.get("forceCollectingInterval") || 0,
    limitCollectRepositoriesPerTry:
      settings.get("limitCollectRepositoriesPerTry") || 0,
    repositoryNamesToCollect: settings.get("repositoryNamesToCollect")
      ? JSON.parse(settings.get("repositoryNamesToCollect"))
      : [],
    drivePath: path.resolve(app.getPath("appData"), "drive"),
  };
};

export const saveSettings = ({
  publicKey,
  secretKey,
  useDriveSwarm,
  dontCollect,
  parallelCollectLimit,
  forceCollectingInterval,
  limitCollectRepositoriesPerTry,
  repositoryNamesToCollect,
}: ApplicationSettings) => {
  if (!publicKey) {
    const keyPair = generateDriveKeys();
    publicKey = keyPair.publicKey;
    secretKey = keyPair.secretKey;
  }
  settings.set("publicKey", publicKey);
  settings.set("secretKey", secretKey);
  settings.set("useDriveSwarm", useDriveSwarm);
  settings.set("dontCollect", dontCollect);
  settings.set("parallelCollectLimit", parallelCollectLimit);
  settings.set("forceCollectingInterval", forceCollectingInterval);
  settings.set(
    "limitCollectRepositoriesPerTry",
    limitCollectRepositoriesPerTry
  );
  settings.set(
    "repositoryNamesToCollect",
    JSON.stringify(repositoryNamesToCollect || [])
  );
};

export const generateKeysSettings = () => {
  const keyPair = generateDriveKeys();
  settings.set("publicKey", keyPair.publicKey);
  settings.set("secretKey", keyPair.secretKey);
};

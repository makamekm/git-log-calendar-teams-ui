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
    parallelCollectingJobLimit: settings.get("parallelCollectingJobLimit") || 1,
    forceCollectingInterval: settings.get("forceCollectingInterval") || 0,
    limitCollectingRepositoriesPerTry:
      settings.get("limitCollectingRepositoriesPerTry") || 0,
    collectingRepositoryNames: settings.get("collectingRepositoryNames")
      ? JSON.parse(settings.get("collectingRepositoryNames"))
      : [],
    drivePath: path.resolve(app.getPath("appData"), "drive"),
    useDriveS3: settings.get("useDriveS3"),
    s3AccessKeyId: settings.get("s3AccessKeyId"),
    s3SecretAccessKey: settings.get("s3SecretAccessKey"),
    s3DrivePath: settings.get("s3DrivePath"),
    s3Bucket: settings.get("s3Bucket"),
    openWindowOnStart: settings.get("openWindowOnStart"),
  };
};

export const saveSettings = ({
  publicKey,
  secretKey,
  useDriveSwarm,
  dontCollect,
  parallelCollectingJobLimit,
  forceCollectingInterval,
  limitCollectingRepositoriesPerTry,
  collectingRepositoryNames,
  useDriveS3,
  s3AccessKeyId,
  s3Bucket,
  s3DrivePath,
  s3SecretAccessKey,
  openWindowOnStart,
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
  settings.set("parallelCollectingJobLimit", parallelCollectingJobLimit);
  settings.set("forceCollectingInterval", forceCollectingInterval);
  settings.set(
    "limitCollectingRepositoriesPerTry",
    limitCollectingRepositoriesPerTry
  );
  settings.set(
    "collectingRepositoryNames",
    JSON.stringify(collectingRepositoryNames || [])
  );
  settings.set("useDriveS3", useDriveS3);
  settings.set("s3AccessKeyId", s3AccessKeyId);
  settings.set("s3Bucket", s3Bucket);
  settings.set("s3DrivePath", s3DrivePath);
  settings.set("s3SecretAccessKey", s3SecretAccessKey);
  settings.set("openWindowOnStart", openWindowOnStart);
};

export const generateKeysSettings = () => {
  const keyPair = generateDriveKeys();
  settings.set("publicKey", keyPair.publicKey);
  settings.set("secretKey", keyPair.secretKey);
};

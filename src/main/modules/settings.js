import { app } from "electron";
import path from "path";
import settings from "electron-settings";
import { generateDriveKeys } from "~/tools";
import { DEV_CONFIG } from "@env/config";

export const getSettings = async () => {
  return {
    publicKey: settings.get("publicKey"),
    secretKey: settings.get("secretKey"),
    useDriveSwarm: settings.get("useDriveSwarm"),
    dontCollect: settings.get("dontCollect"),
    ignoreSSLCertificate: settings.get("ignoreSSLCertificate"),
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
    useWebServer: settings.get("useWebServer"),
    webHostname: settings.get("webHostname"),
    webPort: settings.get("webServerPort"),
    webIgnoreCors: true,
    webStaticPath: path.normalize(`${__dirname}/../../../`),
    webProxy: process.env.NODE_ENV === "development" && "http://localhost:3000",
    tempPath: path.resolve(app.getPath("temp"), "repositories"),
    initConfigPath: path.resolve(app.getPath("home"), DEV_CONFIG),
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
  useWebServer,
  webHostname,
  webPort,
  ignoreSSLCertificate,
}) => {
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
  settings.set("useWebServer", useWebServer);
  settings.set("webHostname", webHostname);
  settings.set("webPort", webPort);
  settings.set("ignoreSSLCertificate", ignoreSSLCertificate);
};

export const generateKeysSettings = () => {
  const keyPair = generateDriveKeys();
  settings.set("publicKey", keyPair.publicKey);
  settings.set("secretKey", keyPair.secretKey);
};

import fs from "fs";
import path from "path";
import YAML from "yaml";
import { argv } from "yargs";
import { SERVER_SETTINGS } from "@env/config";
import { nameofHandler, IpcHandler } from "~/shared/ipc";

ipcBus.handle(
  nameofHandler("GET_SETTINGS"),
  async (
    ...args: Parameters<IpcHandler["GET_SETTINGS"]>
  ): Promise<ReturnType<IpcHandler["GET_SETTINGS"]>> => {
    const configPath = path.resolve(
      process.env.SERVER_SETTINGS || (argv.path as string) || SERVER_SETTINGS
    );
    const config = fs.existsSync(configPath)
      ? YAML.parse(fs.readFileSync(configPath, "utf-8"))
      : {};
    let port = Number(argv.web);
    port = port === 1 ? 8080 : port || 8080;
    return {
      publicKey: process.env.PUBLIC_KEY,
      secretKey: process.env.SECRET_KEY,
      parallelCollectingJobLimit: process.env.PARALLEL_JOB_LIMIT
        ? Number(process.env.PARALLEL_JOB_LIMIT)
        : 1,
      forceCollectingInterval: process.env.FORCE_INTERVAL
        ? Number(process.env.FORCE_INTERVAL)
        : 0,
      limitCollectingRepositoriesPerTry: process.env.JOBS_PER_TRY
        ? Number(process.env.JOBS_PER_TRY)
        : 0,
      collectingRepositoryNames: process.env.REPO_NAMES
        ? JSON.parse(process.env.REPO_NAMES)
        : [],
      useDriveSwarm: process.env.USE_DRIVE_SWARM || false,
      useDriveS3: process.env.USE_DRIVE_S3 || false,
      s3AccessKeyId: process.env.S3_ACCESS_KEY_ID,
      s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      s3DrivePath: process.env.S3_DRIVE_PATH,
      s3Bucket: process.env.S3_BUCKET,
      drivePath: process.env.DRIVE_PATH || "./drive",
      tempPath: process.env.TEMP_PATH || "./temp",
      useWebServer: process.env.USE_WEB || argv["web"],
      webHostname: process.env.WEB_HOSTNAME || argv["web-hostname"],
      webPort: process.env.WEB_PORT || argv["web-port"],
      webIgnoreCors: process.env.WEB_IGNORE_CORS || argv["web-ignore-cors"],
      webProxy: process.env.WEB_PROXY || argv["web-proxy"],
      webStaticPath: argv["web-static"]
        ? path.resolve(String(argv["web-static"]))
        : "./build",
      ignoreSSLCertificate: process.env.IGNORE_SSL || argv["ignore-ssl"],
      ...config,
      dontCollect: false,
    };
  }
);

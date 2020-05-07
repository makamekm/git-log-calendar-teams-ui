import hyperdrive from "hyperdrive";
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import md5 from "md5";
import hyperswarm from "hyperswarm";
import pump from "pump";
import {
  SWARM_INIT_TIMEOUT,
  DRIVE_INIT_TIMEOUT,
  DRIVE_BASE_FOLDER,
  BOOTSTRAP_SERVERS,
} from "@env/config";
import { ipc } from "~/shared/ipc";

const getBaseFolder = (publicKey: string, secretKey: string, dir: string) => {
  dir = DRIVE_BASE_FOLDER || dir;
  if (!dir) {
    throw new Error("No drive folder set!");
  }

  return path.resolve(dir, publicKey, md5(secretKey));
};

let drive;
let swarm;

export const parseKey = (key) => {
  return Buffer.from(key, "hex");
};

export const readKeyFile = (file) => {
  return parseKey(fs.readFileSync(file, "utf8"));
};

export const getDrive = () => drive;

export const writeFile = (file, content) =>
  new Promise<void>((r, e) => {
    drive.writeFile(file, content, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    });
  });

export const readFile = <T = string>(file, encoding = "utf-8") =>
  new Promise<T>((r, e) => {
    drive.readFile(file, encoding, (err, data) => {
      if (err) {
        e(err);
      } else {
        r(data);
      }
    });
  });

export const readDir = (dir) =>
  new Promise<string[]>((r, e) => {
    drive.readdir(dir, (err, list) => {
      if (err) {
        e(err);
      } else {
        r(list);
      }
    });
  });

export const unlink = (file) =>
  new Promise<void>((r, e) => {
    drive.unlink(file, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    });
  });

export const isExist = (file) =>
  new Promise<boolean>((r, e) => {
    drive.exists(file, (result) => {
      r(result);
    });
  });

export const rmDir = (file) =>
  new Promise<void>((r, e) => {
    drive.rmdir(file, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    });
  });

export const stat = (file) =>
  new Promise<any>((r, e) => {
    drive.stat(file, (err, stats) => {
      if (err) {
        e(err);
      } else {
        r(stats);
      }
    });
  });

export const emptyDir = async (dirPath) => {
  const files = await readDir(dirPath);
  if (files.length > 0)
    for (let file of files) {
      const filePath = (dirPath === "/" ? dirPath : dirPath + "/") + file;
      const stats = await stat(filePath);
      if (stats.isFile()) {
        await unlink(filePath);
      } else {
        await emptyDir(filePath);
      }
    }
  if (dirPath !== "/") {
    await rmDir(dirPath);
  }
};

export const closeDrive = () => {
  if (drive) {
    try {
      drive.close();
    } catch (error) {
      console.error(error);
    }
    try {
      if (swarm) {
        swarm.destroy();
      }
    } catch (error) {
      console.error(error);
    }
    drive = null;
    swarm = null;
  }
};

let inited = false;

export const waitForDrive = async () => {
  if (!inited) {
    let settings = await ipc.handlers.GET_SETTINGS();
    if (settings.useDriveSwarm) {
      await new Promise((r) => setTimeout(r, SWARM_INIT_TIMEOUT));
    } else {
      await new Promise((r) => setTimeout(r, DRIVE_INIT_TIMEOUT));
    }
  }
  inited = true;
  return void 0;
};

export const isDriveWritable = async (): Promise<boolean> => {
  await waitForDrive();
  return drive.writable;
};

export const emptyDrive = async () => {
  let settings = await ipc.handlers.GET_SETTINGS();
  const dir = getBaseFolder(
    settings.publicKey,
    settings.secretKey,
    settings.drivePath
  );
  if (fs.existsSync(dir)) {
    fsExtra.removeSync(dir);
  }
};

export const remountDrive = async () => {
  let settings = await ipc.handlers.GET_SETTINGS();
  const dir = getBaseFolder(
    settings.publicKey,
    settings.secretKey,
    settings.drivePath
  );
  if (fs.existsSync(dir)) {
    fsExtra.removeSync(dir);
  }
  createDrive();
};

export const createDrive = async () => {
  inited = false;
  closeDrive();
  let settings = await ipc.handlers.GET_SETTINGS();
  if (!settings.publicKey) {
    await ipc.handlers.REGENERATE_KEY_PAIR();
    settings = await ipc.handlers.GET_SETTINGS();
  }

  drive = hyperdrive(
    getBaseFolder(settings.publicKey, settings.secretKey, settings.drivePath),
    settings.publicKey,
    {
      secretKey: settings.secretKey ? parseKey(settings.secretKey) : undefined,
    }
  );

  if (settings.useDriveSwarm) {
    swarm = hyperswarm({
      bootstrap: BOOTSTRAP_SERVERS,
    });

    drive.on("ready", () => {
      swarm.join(parseKey(settings.publicKey), {
        announce: true,
        lookup: true,
      });
    });

    drive.on("update", () => {
      ipc.sends.ON_DRIVE_UPDATE();
    });

    swarm.on("connection", (connection, info) => {
      const stream = drive.replicate({
        initiator: info.client,
        live: true,
        upload: true,
        download: true,
        encrypt: true,
      });

      pump(connection, stream, connection);
    });
  }

  ipc.sends.ON_DRIVE_CREATED();
};

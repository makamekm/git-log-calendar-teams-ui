import hyperdrive from "hyperdrive";
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import { app } from "electron";
import hyperswarm from "hyperswarm";
import pump from "pump";
import crypto from "hypercore-crypto";
import settings from "electron-settings";
import { SWARM_INIT_TIMEOUT, DRIVE_BASE_FOLDER } from "@env/config";
import { Chat } from "./chat/chat";

export const generateDriveKeys = () => {
  const keyPair = crypto.keyPair();
  return {
    publicKey: keyPair.publicKey.toString("hex"),
    secretKey: keyPair.secretKey.toString("hex"),
  };
};

const getBaseFolder = () => {
  return path.resolve(
    DRIVE_BASE_FOLDER
      ? path.resolve(DRIVE_BASE_FOLDER)
      : path.resolve(app.getPath("temp"), "drive"),
    settings.get("publicKey")
  );
};

let drive;
let swarm;
let chat: Chat;

export const getChat = () => chat;

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
    try {
      if (chat) {
        chat.destroy();
      }
    } catch (error) {
      console.error(error);
    }
    drive = null;
    swarm = null;
    chat = null;
  }
};

let inited = false;

export const waitForDrive = async () => {
  if (settings.get("useDriveSwarm") && !inited) {
    await new Promise((r) => setTimeout(r, SWARM_INIT_TIMEOUT));
  }
  inited = true;
  return void 0;
};

export const getDriveConfig = () => {
  return {
    publicKey: settings.get("publicKey"),
    secretKey: settings.get("secretKey"),
    useDriveSwarm: settings.get("useDriveSwarm"),
  };
};

export const loadDriveKeys = () => {
  if (!settings.has("publicKey") || !settings.has("secretKey")) {
    const keyPair = generateDriveKeys();
    settings.set("publicKey", keyPair.publicKey);
    settings.set("secretKey", keyPair.secretKey);
    if (fs.existsSync(getBaseFolder())) {
      fsExtra.removeSync(getBaseFolder());
    }
  }
  const publicKey = settings.get("publicKey");
  const secretKey = settings.get("secretKey");
  return {
    publicKey: parseKey(publicKey),
    secretKey: parseKey(secretKey),
    useDriveSwarm: settings.get("useDriveSwarm"),
  };
};

export const saveDriveConfig = (
  publicKey: string,
  secretKey: string,
  useDriveSwarm: boolean
) => {
  closeDrive();
  if (!publicKey || !secretKey) {
    const keyPair = generateDriveKeys();
    publicKey = keyPair.publicKey;
    secretKey = keyPair.secretKey;
  }
  settings.set("publicKey", publicKey);
  settings.set("secretKey", secretKey);
  settings.set("useDriveSwarm", useDriveSwarm);
  if (fs.existsSync(getBaseFolder())) {
    fsExtra.removeSync(getBaseFolder());
  }
  createDrive();
};

export const createDrive = () => {
  inited = false;
  closeDrive();
  const { publicKey, secretKey, useDriveSwarm } = loadDriveKeys();
  drive = hyperdrive(getBaseFolder(), publicKey.toString("hex"), {
    secretKey,
  });
  if (useDriveSwarm) {
    chat = new Chat(publicKey.toString("hex") + secretKey.toString("hex"));
    swarm = hyperswarm();

    drive.on("ready", () => {
      swarm.join(publicKey, {
        announce: true,
        lookup: true,
      });
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
};

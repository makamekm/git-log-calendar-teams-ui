import hyperdrive from "hyperdrive";
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";
import { app } from "electron";
import md5 from "md5";
import hyperswarm from "hyperswarm";
import pump from "pump";
import crypto from "hypercore-crypto";
import settings from "electron-settings";
import { SWARM_INIT_TIMEOUT, DRIVE_BASE_FOLDER } from "@env/config";
import { Chat } from "./chat/chat";
import { ipc } from "~/shared/ipc";

export interface ApplicationSettings {
  publicKey: string;
  secretKey: string;
  useDriveSwarm: boolean;
  communicationKey: string;
}

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
      : path.resolve(app.getPath("appData"), "drive"),
    settings.get("publicKey"),
    md5(settings.get("secretKey"))
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

export const getSettings = (): ApplicationSettings => {
  return {
    publicKey: settings.get("publicKey"),
    secretKey: settings.get("secretKey"),
    useDriveSwarm: settings.get("useDriveSwarm"),
    communicationKey: settings.get("communicationKey"),
  };
};

export const emptyDrive = () => {
  if (fs.existsSync(getBaseFolder())) {
    fsExtra.removeSync(getBaseFolder());
  }
};

export const remountDrive = () => {
  if (fs.existsSync(getBaseFolder())) {
    fsExtra.removeSync(getBaseFolder());
  }
  createDrive();
};

export const loadSettings = (): ApplicationSettings => {
  if (!settings.has("publicKey") || !settings.has("secretKey")) {
    const keyPair = generateDriveKeys();
    settings.set("publicKey", keyPair.publicKey);
    settings.set("secretKey", keyPair.secretKey);
    emptyDrive();
  }
  const publicKey = settings.get("publicKey");
  const secretKey = settings.get("secretKey");
  return {
    publicKey: publicKey,
    secretKey: secretKey,
    useDriveSwarm: settings.get("useDriveSwarm"),
    communicationKey: settings.get("communicationKey"),
  };
};

export const saveSettings = ({
  publicKey,
  secretKey,
  useDriveSwarm,
  communicationKey,
}: ApplicationSettings) => {
  closeDrive();
  if (!publicKey || !secretKey) {
    const keyPair = generateDriveKeys();
    publicKey = keyPair.publicKey;
    secretKey = keyPair.secretKey;
  }
  settings.set("publicKey", publicKey);
  settings.set("secretKey", secretKey);
  settings.set("useDriveSwarm", useDriveSwarm);
  settings.set("communicationKey", communicationKey);
  createDrive();
};

export const createDrive = () => {
  inited = false;
  closeDrive();
  const { publicKey, secretKey, useDriveSwarm } = loadSettings();
  drive = hyperdrive(getBaseFolder(), publicKey, {
    secretKey: parseKey(secretKey),
  });
  if (useDriveSwarm) {
    swarm = hyperswarm();
    if (settings.get("communicationKey")) {
      chat = new Chat(settings.get("communicationKey"));
    }

    drive.on("ready", () => {
      swarm.join(parseKey(publicKey), {
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
};

import { ipcMain, app } from "electron";
import crypto from "hypercore-crypto";
import { crypto_generichash, crypto_generichash_BYTES } from "sodium-universal";
import { UNREGISTERED_SYMBOL, getAuthor } from "./git";
import { ipc, nameofSends } from "~/shared/ipc";
import { isExist, readFile, writeFile, parseKey, waitForDrive } from "./drive";
import { UserConnection } from "~/shared/UserConnection";
import { getUserSettings } from "./handlers/auth.handler";

const USERS_FILE_PATH = "/users.json";

let usersCache: { [email: string]: UserConnection } = null;

export const getUserKey = async (email: string, name: string) => {
  const config = await ipc.handlers.GET_CONFIG();
  const user = getAuthor(config.users, email, name);
  return (
    (user && user.name) ||
    `${email.toLowerCase()} ${name.toLowerCase()} ${UNREGISTERED_SYMBOL}`
  );
};

app.on("ready", () => {
  ipcMain.on(nameofSends("ON_DRIVE_UPDATE"), () => {
    usersCache = null;
  });
  ipcMain.on(nameofSends("ON_SETTINGS_UPDATE_FINISH"), () => {
    usersCache = null;
  });
});

const readUserCacheFile = async () => {
  await waitForDrive();
  const isCacheFileExist = await isExist(USERS_FILE_PATH);
  if (isCacheFileExist) {
    return JSON.parse(await readFile(USERS_FILE_PATH));
  } else {
    return {};
  }
};

const refillUsersCache = async () => {
  if (!usersCache) {
    const table = await readUserCacheFile();
    usersCache = table || {};
  }
};

const saveUsersCache = async () => {
  await writeFile(USERS_FILE_PATH, JSON.stringify(usersCache, null, 2));
};

export const getUsers = async () => {
  await refillUsersCache();
  return usersCache;
};

export const getUserConnection = async (
  email: string,
  message: string,
  signature: string
) => {
  const users = await getUsers();
  const user = users[email];
  const key = Buffer.alloc(crypto_generichash_BYTES);
  crypto_generichash(key, message);
  if (
    user &&
    crypto.verify(key, parseKey(signature), parseKey(user.publicKey))
  ) {
    return user;
  }
  return null;
};

export const registerUserConnection = async (user: UserConnection) => {
  const users = await getUsers();
  if (!user.email || !user.publicKey) {
    return;
  }
  if (users[user.email]) {
    return null;
  } else {
    users[user.email] = user;
    await saveUsersCache();
    return user;
  }
};

export const updateUserConnection = async (user: UserConnection) => {
  const users = await getUsers();
  if (users[user.email]) {
    users[user.email] = user;
    await saveUsersCache();
  }
};

export const deleteUserConnection = async (email: string) => {
  const users = await getUsers();
  delete users[email];
  await saveUsersCache();
};

export const migrateUserConnection = async (
  email: string,
  message: string,
  signature: string,
  newUser: UserConnection
) => {
  const users = await getUsers();
  const user = await getUserConnection(email, message, signature);
  if (user) {
    delete users[email];
    users[newUser.email] = newUser;
    await saveUsersCache();
  }
};

export const generateMessage = () => crypto.keyPair().publicKey.toString("hex");

export const generateUserConnection = (message: string) => {
  const user = getUserSettings();
  const key = Buffer.alloc(crypto_generichash_BYTES);
  crypto_generichash(key, message);
  const signature = crypto
    .sign(key, parseKey(user.userSecretKey))
    .toString("hex");
  return {
    email: user.email,
    name: user.name,
    publicKey: user.userPublicKey,
    message,
    signature,
  };
};

import { ipcMain, app } from "electron";
import settings from "electron-settings";
import crypto from "hypercore-crypto";
import { UNREGISTERED_SYMBOL, getAuthor } from "./git";
import { ipc, nameofSends } from "~/shared/ipc";
import { isExist, readFile, writeFile, parseKey } from "./drive";
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
  ipcMain.on(nameofSends("ON_CHANGE_USER"), () => {
    usersCache = null;
  });
  ipcMain.on(nameofSends("ON_COLLECT_FINISH"), () => {
    usersCache = null;
  });
});

const readUserCacheFile = async () => {
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
    usersCache = table[settings.get("email")] || {};
  }
};

const saveUsersCache = async () => {
  const table = await readUserCacheFile();
  table[settings.get("email")] = usersCache;
  await writeFile(USERS_FILE_PATH, JSON.stringify(table, null, 2));
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
  if (
    user &&
    crypto.verify(message, parseKey(signature), parseKey(user.publicKey))
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
  const signature = crypto
    .sign(message, parseKey(user.secretKey))
    .toString("hex");
  return {
    email: user.email,
    name: user.name,
    publicKey: user.publicKey,
    message,
    signature,
  };
};

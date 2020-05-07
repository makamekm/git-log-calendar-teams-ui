import { Config } from "./Config";
import { Json, JsonCompatible } from "./Json";
import { ApplicationSettings } from "./Settings";

export const nameof = <T>(name: keyof T) => name;

export const nameofChannel = (name: keyof typeof ipc.channels) =>
  nameof<typeof ipc.channels>(name);
export const nameofHandler = (name: keyof typeof ipc.handlers) =>
  nameof<typeof ipc.handlers>(name);
export const nameofSends = (name: keyof typeof ipc.sends) =>
  nameof<typeof ipc.sends>(name);

export interface IpcHandler {
  APP_INFO: () => {
    appName: string;
    appVersion: string;
  };
  PRINT: () => void;
  COLLECT_STATS: () => void;
  IS_COLLECTING_STATS: () => boolean;
  GET_CALENDAR_DATA: (
    mode: "users" | "repositories" | "teams",
    options: {
      limit: number;
      mode?: "user" | "repository" | "team";
      name?: string;
    }
  ) => {
    [team: string]: {
      [day: string]: number;
    };
  };
  GET_MESSAGES: (options: {
    query: string;
    limit: number;
    maxMessages: number;
    mode?: "user" | "repository" | "team";
    name?: string;
  }) => {
    message: string;
    user: string;
    date: string;
    repository: string;
    value: number;
  }[];
  GET_STATS_DATA: (options: {
    limit: number;
    mode?: "user" | "repository" | "team";
    name?: string;
    top?: number;
  }) => {
    commits: {
      todayValue: number;
      value: number;
    };
    changes: {
      todayValue: number;
      value: number;
    };
    topTeams?: {
      todayValue: {
        name: string;
        value: number;
      }[];
      value: {
        name: string;
        value: number;
      }[];
    };
    topUsers?: {
      todayValue: {
        name: string;
        value: number;
      }[];
      value: {
        name: string;
        value: number;
      }[];
    };
    topRepositories?: {
      todayValue: {
        name: string;
        value: number;
      }[];
      value: {
        name: string;
        value: number;
      }[];
    };
    stats: {
      activeRepositories?: {
        todayValue: number;
        value: number;
      };
      activeUsers?: {
        todayValue: number;
        value: number;
      };
      activeTeams?: {
        todayValue: number;
        value: number;
      };
    };
  };
  GET_CONFIG: (force?: boolean) => Config;
  SAVE_CONFIG: (config: Config) => void;
  LOG: (
    log: any,
    level?: "info" | "warn" | "error" | "verbose" | "debug" | "silly"
  ) => void;
  CLEAR_LOGS: () => void;
  GET_LOGS: (
    search: string,
    limit?: number
  ) => {
    main: string[];
    renderer: string[];
  };
  GET_REPOSITORY_USERS: (
    name?: string[],
    limit?: number
  ) => {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
    valueTotal: number;
  }[];
  GET_DATA: () => any;
  GET_SETTINGS: () => ApplicationSettings;
  SAVE_SETTINGS: (config: ApplicationSettings) => void;
  REMOUNT_DRIVE: () => void;
  EMPTY_DRIVE: () => void;
  REGENERATE_KEY_PAIR: () => void;
  GET_ONLINE_USERS: () => string[];
  GET_CHANNELS: () => {
    [name: string]: string[];
  };
  CREATE_CHANNEL: (name: string) => string;
  CLOSE_CHANNEL: (name: string) => void;
  SEND_CHANNEL_MESSAGE: (name: string, message: JsonCompatible) => void;
  SEND_USER_MESSAGE: (email: string, message: JsonCompatible) => void;
  REGISTER_USER: (email: string, username: string) => void;
}

const channelFactory = <T = any[], K = void>(name: string) => (
  callback: (...args: any[]) => void
) => {
  const listener = (event: any, ...args) => {
    callback(...args);
  };
  ipcBus.on(name, listener);
  return () => ipcBus.removeListener(name, listener);
};

export const ipc = {
  channels: {
    ON_COLLECT_STATS: channelFactory("ON_COLLECT_STATS"),
    ON_CHANNEL_MESSAGE: channelFactory("ON_CHANNEL_MESSAGE"),
    ON_SETTINGS_UPDATE_FINISH: channelFactory("ON_SETTINGS_UPDATE_FINISH"),
    ON_DRIVE_UPDATE: channelFactory("ON_DRIVE_UPDATE"),
    ON_COLLECT_FINISH: channelFactory("ON_COLLECT_FINISH"),
    ON_CHANNEL_VERIFYED_MESSAGE: channelFactory("ON_CHANNEL_VERIFYED_MESSAGE"),
    ON_CHANNEL_AUTH_FAIL: channelFactory("ON_CHANNEL_AUTH_FAIL"),
    ON_CHANNEL_UPDATE: channelFactory("ON_CHANNEL_UPDATE"),
    ON_CONFIG_UPDATE_STARTED: channelFactory("ON_CONFIG_UPDATE_STARTED"),
    ON_CONFIG_UPDATE_FINISHED: channelFactory("ON_CONFIG_UPDATE_FINISHED"),
  },
  handlers: {
    APP_INFO: (
      ...args: Parameters<IpcHandler["APP_INFO"]>
    ): Promise<ReturnType<IpcHandler["APP_INFO"]>> =>
      ipcBus.invoke(nameofHandler("APP_INFO"), ...args),
    COLLECT_STATS: (
      ...args: Parameters<IpcHandler["COLLECT_STATS"]>
    ): Promise<ReturnType<IpcHandler["COLLECT_STATS"]>> =>
      ipcBus.invoke(nameofHandler("COLLECT_STATS"), ...args),
    IS_COLLECTING_STATS: (
      ...args: Parameters<IpcHandler["IS_COLLECTING_STATS"]>
    ): Promise<ReturnType<IpcHandler["IS_COLLECTING_STATS"]>> =>
      ipcBus.invoke(nameofHandler("IS_COLLECTING_STATS"), ...args),
    GET_CALENDAR_DATA: (
      ...args: Parameters<IpcHandler["GET_CALENDAR_DATA"]>
    ): Promise<ReturnType<IpcHandler["GET_CALENDAR_DATA"]>> =>
      ipcBus.invoke(nameofHandler("GET_CALENDAR_DATA"), ...args),
    GET_CONFIG: (
      ...args: Parameters<IpcHandler["GET_CONFIG"]>
    ): Promise<ReturnType<IpcHandler["GET_CONFIG"]>> =>
      ipcBus.invoke(nameofHandler("GET_CONFIG"), ...args),
    GET_DATA: (
      ...args: Parameters<IpcHandler["GET_DATA"]>
    ): Promise<ReturnType<IpcHandler["GET_DATA"]>> =>
      ipcBus.invoke(nameofHandler("GET_DATA"), ...args),
    SAVE_CONFIG: (
      ...args: Parameters<IpcHandler["SAVE_CONFIG"]>
    ): Promise<ReturnType<IpcHandler["SAVE_CONFIG"]>> =>
      ipcBus.invoke(nameofHandler("SAVE_CONFIG"), ...args),
    LOG: (
      ...args: Parameters<IpcHandler["LOG"]>
    ): Promise<ReturnType<IpcHandler["LOG"]>> =>
      ipcBus.invoke(nameofHandler("LOG"), ...args),
    CLEAR_LOGS: (
      ...args: Parameters<IpcHandler["CLEAR_LOGS"]>
    ): Promise<ReturnType<IpcHandler["CLEAR_LOGS"]>> =>
      ipcBus.invoke(nameofHandler("CLEAR_LOGS"), ...args),
    GET_LOGS: (
      ...args: Parameters<IpcHandler["GET_LOGS"]>
    ): Promise<ReturnType<IpcHandler["GET_LOGS"]>> =>
      ipcBus.invoke(nameofHandler("GET_LOGS"), ...args),
    GET_STATS_DATA: (
      ...args: Parameters<IpcHandler["GET_STATS_DATA"]>
    ): Promise<ReturnType<IpcHandler["GET_STATS_DATA"]>> =>
      ipcBus.invoke(nameofHandler("GET_STATS_DATA"), ...args),
    PRINT: (
      ...args: Parameters<IpcHandler["PRINT"]>
    ): Promise<ReturnType<IpcHandler["PRINT"]>> =>
      ipcBus.invoke(nameofHandler("PRINT"), ...args),
    GET_REPOSITORY_USERS: (
      ...args: Parameters<IpcHandler["GET_REPOSITORY_USERS"]>
    ): Promise<ReturnType<IpcHandler["GET_REPOSITORY_USERS"]>> =>
      ipcBus.invoke(nameofHandler("GET_REPOSITORY_USERS"), ...args),
    GET_MESSAGES: (
      ...args: Parameters<IpcHandler["GET_MESSAGES"]>
    ): Promise<ReturnType<IpcHandler["GET_MESSAGES"]>> =>
      ipcBus.invoke(nameofHandler("GET_MESSAGES"), ...args),
    GET_SETTINGS: (
      ...args: Parameters<IpcHandler["GET_SETTINGS"]>
    ): Promise<ReturnType<IpcHandler["GET_SETTINGS"]>> =>
      ipcBus.invoke(nameofHandler("GET_SETTINGS"), ...args),
    SAVE_SETTINGS: (
      ...args: Parameters<IpcHandler["SAVE_SETTINGS"]>
    ): Promise<ReturnType<IpcHandler["SAVE_SETTINGS"]>> =>
      ipcBus.invoke(nameofHandler("SAVE_SETTINGS"), ...args),
    EMPTY_DRIVE: (
      ...args: Parameters<IpcHandler["EMPTY_DRIVE"]>
    ): Promise<ReturnType<IpcHandler["EMPTY_DRIVE"]>> =>
      ipcBus.invoke(nameofHandler("EMPTY_DRIVE"), ...args),
    REGENERATE_KEY_PAIR: (
      ...args: Parameters<IpcHandler["REGENERATE_KEY_PAIR"]>
    ): Promise<ReturnType<IpcHandler["REGENERATE_KEY_PAIR"]>> =>
      ipcBus.invoke(nameofHandler("REGENERATE_KEY_PAIR"), ...args),
    REMOUNT_DRIVE: (
      ...args: Parameters<IpcHandler["REMOUNT_DRIVE"]>
    ): Promise<ReturnType<IpcHandler["REMOUNT_DRIVE"]>> =>
      ipcBus.invoke(nameofHandler("REMOUNT_DRIVE"), ...args),
    GET_ONLINE_USERS: (
      ...args: Parameters<IpcHandler["GET_ONLINE_USERS"]>
    ): Promise<ReturnType<IpcHandler["GET_ONLINE_USERS"]>> =>
      ipcBus.invoke(nameofHandler("GET_ONLINE_USERS"), ...args),
    GET_CHANNELS: (
      ...args: Parameters<IpcHandler["GET_CHANNELS"]>
    ): Promise<ReturnType<IpcHandler["GET_CHANNELS"]>> =>
      ipcBus.invoke(nameofHandler("GET_CHANNELS"), ...args),
    CREATE_CHANNEL: (
      ...args: Parameters<IpcHandler["CREATE_CHANNEL"]>
    ): Promise<ReturnType<IpcHandler["CREATE_CHANNEL"]>> =>
      ipcBus.invoke(nameofHandler("CREATE_CHANNEL"), ...args),
    CLOSE_CHANNEL: (
      ...args: Parameters<IpcHandler["CLOSE_CHANNEL"]>
    ): Promise<ReturnType<IpcHandler["CLOSE_CHANNEL"]>> =>
      ipcBus.invoke(nameofHandler("CLOSE_CHANNEL"), ...args),
    SEND_CHANNEL_MESSAGE: (
      ...args: Parameters<IpcHandler["SEND_CHANNEL_MESSAGE"]>
    ): Promise<ReturnType<IpcHandler["SEND_CHANNEL_MESSAGE"]>> =>
      ipcBus.invoke(nameofHandler("SEND_CHANNEL_MESSAGE"), ...args),
    SEND_USER_MESSAGE: (
      ...args: Parameters<IpcHandler["SEND_USER_MESSAGE"]>
    ): Promise<ReturnType<IpcHandler["SEND_USER_MESSAGE"]>> =>
      ipcBus.invoke(nameofHandler("SEND_USER_MESSAGE"), ...args),
    REGISTER_USER: (
      ...args: Parameters<IpcHandler["REGISTER_USER"]>
    ): Promise<ReturnType<IpcHandler["REGISTER_USER"]>> =>
      ipcBus.invoke(nameofHandler("REGISTER_USER"), ...args),
  },
  sends: {
    ON_COLLECT_STATS: (value: boolean) =>
      ipcBus.send(nameofSends("ON_COLLECT_STATS"), value),
    ON_SETTINGS_UPDATE_FINISH: () =>
      ipcBus.send(nameofSends("ON_SETTINGS_UPDATE_FINISH")),
    ON_DRIVE_UPDATE: () => ipcBus.send(nameofSends("ON_DRIVE_UPDATE")),
    ON_DRIVE_CREATED: () => ipcBus.send(nameofSends("ON_DRIVE_CREATED")),
    ON_COLLECT_FINISH: () => ipcBus.send(nameofSends("ON_COLLECT_FINISH")),
    ON_CHANNEL_MESSAGE: (channel: string, peer, data: Json) =>
      ipcBus.send(nameofSends("ON_CHANNEL_MESSAGE"), channel, peer, data),
    ON_CHANNEL_PEER_START: (channel: string, peer) =>
      ipcBus.send(nameofSends("ON_CHANNEL_PEER_START"), channel, peer),
    ON_CHANNEL_PEER_END: (channel: string, peer) =>
      ipcBus.send(nameofSends("ON_CHANNEL_PEER_END"), channel, peer),
    ON_CHANNEL_UPDATE: (channelName: string) =>
      ipcBus.send(nameofSends("ON_CHANNEL_UPDATE"), channelName),
    ON_CONFIG_UPDATE_STARTED: () =>
      ipcBus.send(nameofSends("ON_CONFIG_UPDATE_STARTED")),
    ON_CONFIG_UPDATE_FINISHED: () =>
      ipcBus.send(nameofSends("ON_CONFIG_UPDATE_FINISHED")),
    ON_CHANNEL_AUTH_FAIL: (channelName: string, email: string, name: string) =>
      ipcBus.send(
        nameofSends("ON_CHANNEL_AUTH_FAIL"),
        channelName,
        email,
        name
      ),
    ON_CHANNEL_VERIFYED_MESSAGE: (
      channelName: string,
      email: string,
      name: string,
      userKey: string,
      data: JsonCompatible
    ) =>
      ipcBus.send(
        nameofSends("ON_CHANNEL_VERIFYED_MESSAGE"),
        channelName,
        email,
        name,
        userKey,
        data
      ),
  },
};

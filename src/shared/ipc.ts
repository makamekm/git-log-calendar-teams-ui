import { Config } from "./Config";

export const nameof = <T>(name: keyof T) => name;

export const nameofChannel = (name: keyof typeof ipc.channels) =>
  nameof<typeof ipc.channels>(name);
export const nameofHandler = (name: keyof typeof ipc.handlers) =>
  nameof<typeof ipc.handlers>(name);
export const nameofSends = (name: keyof typeof ipc.sends) =>
  nameof<typeof ipc.sends>(name);

export interface Ipc {
  channels: {
    APP_INFO: () => {
      appName: string;
      appVersion: string;
    };
  };
  handlers: {
    APP_INFO: () => {
      appName: string;
      appVersion: string;
    };
    PRINT: () => void;
    COLLECT_STATS: () => void;
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
    GET_LOGS: (
      search: string,
      limit?: number
    ) => {
      main: string[];
      renderer: string[];
    };
    GET_REPOSITORY_USERS: (
      name?: string[]
    ) => {
      userKey: string;
      user?: {
        name: string;
      };
      email: string;
      name: string;
      value: number;
    }[];
    GET_DATA: () => any;
    GET_DRIVE_CONFIG: () => {
      publicKey: string;
      secretKey: string;
      useDriveSwarm: boolean;
    };
    SAVE_DRIVE_CONFIG: (config: {
      publicKey: string;
      secretKey: string;
      useDriveSwarm: boolean;
    }) => void;
    EMPTY_DRIVE_CONFIG: () => void;
  };
  sends: {
    ON_COLLECT_STATS: () => void;
    ON_DRIVE_CONFIG_UPDATE_FINISH: () => void;
    ON_COLLECT_FINISH: () => void;
  };
}

export const ipc = {
  channels: {
    APP_INFO: {
      ask: () => ipcRenderer.send(nameofChannel("APP_INFO")),
      subscribe: (callback: (...args: any[]) => void) => {
        const listener = (event: any, ...args: any[]) => {
          callback(...args);
        };
        ipcRenderer.on(nameofChannel("APP_INFO"), listener);
        return ipcRenderer.removeListener(nameofChannel("APP_INFO"), listener);
      },
    },
  },
  handlers: {
    APP_INFO: (
      ...args: Parameters<Ipc["handlers"]["APP_INFO"]>
    ): Promise<ReturnType<Ipc["handlers"]["APP_INFO"]>> =>
      ipcRenderer.invoke(nameofHandler("APP_INFO"), ...args),
    COLLECT_STATS: (
      ...args: Parameters<Ipc["handlers"]["COLLECT_STATS"]>
    ): Promise<ReturnType<Ipc["handlers"]["COLLECT_STATS"]>> =>
      ipcRenderer.invoke(nameofHandler("COLLECT_STATS"), ...args),
    GET_CALENDAR_DATA: (
      ...args: Parameters<Ipc["handlers"]["GET_CALENDAR_DATA"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_CALENDAR_DATA"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_CALENDAR_DATA"), ...args),
    GET_CONFIG: (
      ...args: Parameters<Ipc["handlers"]["GET_CONFIG"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_CONFIG"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_CONFIG"), ...args),
    GET_DATA: (
      ...args: Parameters<Ipc["handlers"]["GET_DATA"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_DATA"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_DATA"), ...args),
    SAVE_CONFIG: (
      ...args: Parameters<Ipc["handlers"]["SAVE_CONFIG"]>
    ): Promise<ReturnType<Ipc["handlers"]["SAVE_CONFIG"]>> =>
      ipcRenderer.invoke(nameofHandler("SAVE_CONFIG"), ...args),
    LOG: (
      ...args: Parameters<Ipc["handlers"]["LOG"]>
    ): Promise<ReturnType<Ipc["handlers"]["LOG"]>> =>
      ipcRenderer.invoke(nameofHandler("LOG"), ...args),
    GET_LOGS: (
      ...args: Parameters<Ipc["handlers"]["GET_LOGS"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_LOGS"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_LOGS"), ...args),
    GET_STATS_DATA: (
      ...args: Parameters<Ipc["handlers"]["GET_STATS_DATA"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_STATS_DATA"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_STATS_DATA"), ...args),
    PRINT: (
      ...args: Parameters<Ipc["handlers"]["PRINT"]>
    ): Promise<ReturnType<Ipc["handlers"]["PRINT"]>> =>
      ipcRenderer.invoke(nameofHandler("PRINT"), ...args),
    GET_REPOSITORY_USERS: (
      ...args: Parameters<Ipc["handlers"]["GET_REPOSITORY_USERS"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_REPOSITORY_USERS"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_REPOSITORY_USERS"), ...args),
    GET_MESSAGES: (
      ...args: Parameters<Ipc["handlers"]["GET_MESSAGES"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_MESSAGES"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_MESSAGES"), ...args),
    GET_DRIVE_CONFIG: (
      ...args: Parameters<Ipc["handlers"]["GET_DRIVE_CONFIG"]>
    ): Promise<ReturnType<Ipc["handlers"]["GET_DRIVE_CONFIG"]>> =>
      ipcRenderer.invoke(nameofHandler("GET_DRIVE_CONFIG"), ...args),
    SAVE_DRIVE_CONFIG: (
      ...args: Parameters<Ipc["handlers"]["SAVE_DRIVE_CONFIG"]>
    ): Promise<ReturnType<Ipc["handlers"]["SAVE_DRIVE_CONFIG"]>> =>
      ipcRenderer.invoke(nameofHandler("SAVE_DRIVE_CONFIG"), ...args),
    EMPTY_DRIVE_CONFIG: (
      ...args: Parameters<Ipc["handlers"]["EMPTY_DRIVE_CONFIG"]>
    ): Promise<ReturnType<Ipc["handlers"]["EMPTY_DRIVE_CONFIG"]>> =>
      ipcRenderer.invoke(nameofHandler("EMPTY_DRIVE_CONFIG"), ...args),
  },
  sends: {
    ON_COLLECT_STATS: (value: boolean) =>
      ipcRenderer.send(nameofSends("ON_COLLECT_STATS"), value),
    ON_DRIVE_CONFIG_UPDATE_FINISH: () =>
      ipcRenderer.send(nameofSends("ON_DRIVE_CONFIG_UPDATE_FINISH")),
    ON_COLLECT_FINISH: () => ipcRenderer.send(nameofSends("ON_COLLECT_FINISH")),
  },
};

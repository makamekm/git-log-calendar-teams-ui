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
      limit: number,
      mode: "users" | "repositories" | "teams"
    ) => {
      [team: string]: {
        [day: string]: number;
      };
    };
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
    GET_DATA: () => any;
  };
  sends: {
    ON_COLLECT_STATS: () => void;
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
  },
  sends: {
    ON_COLLECT_STATS: (value: boolean) =>
      ipcRenderer.send(nameofSends("ON_COLLECT_STATS"), value),
  },
};

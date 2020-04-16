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
    COLLECT_STATS: () => void;
    GET_CALENDAR_TEAM: () => any[];
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
    APP_INFO: (): Promise<ReturnType<Ipc["handlers"]["APP_INFO"]>> =>
      ipcRenderer.invoke(nameofHandler("APP_INFO")),
    COLLECT_STATS: (): Promise<ReturnType<Ipc["handlers"]["COLLECT_STATS"]>> =>
      ipcRenderer.invoke(nameofHandler("COLLECT_STATS")),
    GET_CALENDAR_TEAM: (): Promise<
      ReturnType<Ipc["handlers"]["GET_CALENDAR_TEAM"]>
    > => ipcRenderer.invoke(nameofHandler("GET_CALENDAR_TEAM")),
  },
  sends: {
    ON_COLLECT_STATS: (value: boolean) =>
      ipcRenderer.send(nameofSends("ON_COLLECT_STATS"), value),
  },
};

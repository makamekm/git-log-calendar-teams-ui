export const nameof = <T>(name: keyof T) => name;

export const nameofChannel = (name: keyof typeof ipc.channels) =>
  nameof<typeof ipc.channels>(name);
export const nameofHandler = (name: keyof typeof ipc.handlers) =>
  nameof<typeof ipc.handlers>(name);

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
      }
    }
  },
  handlers: {
    APP_INFO: (): Promise<ReturnType<Ipc["handlers"]["APP_INFO"]>> =>
      ipcRenderer.invoke(nameofHandler("APP_INFO"))
  }
};

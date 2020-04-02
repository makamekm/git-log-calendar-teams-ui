import React from "react";
import logo from "./logo.svg";
import "./app.css";
import { channels } from "./shared/constants";

export const App = () => {
  const [state, setState] = React.useState({
    appName: "",
    appVersion: ""
  });

  const askAppInfo = async () => {
    // ipcRenderer.send(channels.APP_INFO);
    // ipcRenderer.on(channels.APP_INFO, (event, arg) => {
    //   ipcRenderer.removeAllListeners(channels.APP_INFO);
    //   const { appName, appVersion } = arg;
    //   setState({ appName, appVersion });
    // });
    const { appName, appVersion } = await ipcRenderer.invoke(channels.APP_INFO);
    setState({ appName, appVersion });
  };

  React.useEffect(() => {
    askAppInfo();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          {state.appName} {state.appVersion}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

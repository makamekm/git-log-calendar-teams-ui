import React from "react";
import logo from "./logo.svg";
import "./app.css";
import { ipc } from "./shared/ipc";

export const App = () => {
  const [state, setState] = React.useState({
    appName: "",
    appVersion: "",
  });

  const askAppInfo = async () => {
    const { appName, appVersion } = await ipc.handlers.APP_INFO();
    setState({ appName, appVersion });
  };

  React.useEffect(() => {
    askAppInfo();
  }, []);

  return (
    <div className="main">
      {state.appName} {state.appVersion}
    </div>
  );
};

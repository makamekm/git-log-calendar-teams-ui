import React from "react";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routes";
import AppLayout from "./layout";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  // const [state, setState] = React.useState({
  //   appName: "",
  //   appVersion: "",
  // });

  // const askAppInfo = async () => {
  //   const { appName, appVersion } = await ipc.handlers.APP_INFO();
  //   setState({ appName, appVersion });
  // };

  // React.useEffect(() => {
  //   askAppInfo();
  // }, []);
  // <div className="main">
  //   {state.appName} {state.appVersion}
  // </div>

  return (
    <Router basename={basePath}>
      <AppLayout>
        <RoutedContent />
      </AppLayout>
    </Router>
  );
};

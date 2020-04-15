import React from "react";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedContent } from "~/routes";
import { AppLayout } from "~/layout";
import { ServiceProvider } from "~/components/ServiceProvider/ServiceProvider";
import { AuthService } from "./app/Auth/AuthContext";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceRoot] = React.useState<React.FC>(ServiceProvider(AuthService));

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
      <ServiceRoot>
        <AppLayout>
          <RoutedContent />
        </AppLayout>
      </ServiceRoot>
    </Router>
  );
};

import React from "react";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedContent } from "~/routes";
import { AppLayout } from "~/layout";
import {
  ServiceProviderFactory,
  ServiceProviderHook,
} from "~/components/ServiceProvider/ServiceProvider";
import { AuthService } from "./app/Auth/AuthContext";
import { LoadingScreen } from "./app/Loading/LoadingScreen";
import { LoadingService } from "./app/Loading/LoadingService";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceRoot] = React.useState<React.FC>(() =>
    ServiceProviderFactory(AuthService, LoadingService)
  );

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
    <ServiceRoot>
      <Router basename={basePath}>
        <ServiceProviderHook>
          <LoadingScreen>
            <AppLayout>
              <RoutedContent />
            </AppLayout>
          </LoadingScreen>
        </ServiceProviderHook>
      </Router>
    </ServiceRoot>
  );
};

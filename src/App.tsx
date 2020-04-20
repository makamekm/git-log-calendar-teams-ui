import React from "react";
import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routing";
import { AppLayout } from "./layout/AppLayout";
import {
  ServiceProviderFactory,
  ServiceProviderHook,
} from "./components/ServiceProvider/ServiceProvider";
import { AuthService } from "./app/Auth/AuthService";
import { LoadingScreen } from "./app/Loading/LoadingScreen";
import { LoadingService } from "./app/Loading/LoadingService";
import { FavouriteService } from "./app/Dashboard/FavouriteService";
import { DashboardService } from "./app/Dashboard/DashboardService";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider] = React.useState<React.FC>(() =>
    ServiceProviderFactory(
      AuthService,
      LoadingService,
      FavouriteService,
      DashboardService
    )
  );

  return (
    <ServiceProvider>
      <Router basename={basePath}>
        <ServiceProviderHook>
          <LoadingScreen>
            <AppLayout>
              <RoutedContent />
            </AppLayout>
          </LoadingScreen>
        </ServiceProviderHook>
      </Router>
    </ServiceProvider>
  );
};

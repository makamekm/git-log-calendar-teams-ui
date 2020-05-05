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
import { FavouriteService } from "./app/FavouriteService";
import { DashboardService } from "./app/DashboardService";
import { SearchService } from "./app/SearchService";
import { MessageService } from "./app/MessageService";
import { RepositoryUserService } from "./app/RepositoryUserService";
import { ConfigService } from "./app/ConfigService";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider] = React.useState<React.FC>(() =>
    ServiceProviderFactory(
      AuthService,
      LoadingService,
      FavouriteService,
      DashboardService,
      SearchService,
      MessageService,
      RepositoryUserService,
      ConfigService
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

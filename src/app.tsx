import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { RoutedContent } from "./routing";
import { AppLayout } from "./app/Layout/AppLayout";
import { useServiceProvider } from "react-service-provider";
import { AuthService } from "./app/Auth/AuthService";
import { LoadingScreen } from "./app/Loading/LoadingScreen";
import { LoadingService } from "./app/Loading/LoadingService";
import { FavouriteService } from "./app/Dashboard/FavouriteService";
import { DashboardService } from "./app/Dashboard/DashboardService";
import { SearchService } from "./app/Layout/SearchService";
import { MessageService } from "./app/Dashboard/MessageService";
import { RepositoryUserService } from "./app/Dashboard/RepositoryUserService";
import { ConfigService } from "./app/ConfigService";
import { LayoutService } from "./components/Layout/LayoutService";

const basePath = process.env.BASE_PATH || "/";

export const App = () => {
  const [ServiceProvider, ServiceProviderHook] = useServiceProvider(
    AuthService,
    LayoutService,
    LoadingService,
    FavouriteService,
    DashboardService,
    SearchService,
    MessageService,
    RepositoryUserService,
    ConfigService
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

import React from "react";
import { Route, Switch, Redirect } from "react-router";

import { ProtectedRoute } from "./app/Auth/ProtectedRoute";
import { AuthScreen } from "./app/Auth/AuthScreen";
import { LogoutRoute } from "./app/Auth/LogoutRoute";
import { Dashboard } from "./app/Dashboard/Dashboard";
import { Error404 } from "./app/Error404";
import { Configuration } from "./app/Configuration/Configuration";
import { LogsScreen } from "./app/Log/LogsScreen";
import { TeamDashboard } from "./app/Details/TeamDashboard";
import { UserDashboard } from "./app/Details/UserDashboard";
import { Settings } from "./app/Settings/Settings";
import { RepositoryDashboard } from "./app/Details/RepositoryDashboard";

export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />

      <Route path="/login/:loginFrom" component={AuthScreen} />
      <LogoutRoute path="/logout/:loginFrom" />

      <Route component={Error404} path="/404" />

      <ProtectedRoute path="/dashboard" exact component={Dashboard} />
      <ProtectedRoute path="/team/:teamName" exact component={TeamDashboard} />
      <ProtectedRoute path="/user/:userName" exact component={UserDashboard} />
      <ProtectedRoute
        path="/repository/:repositoryName"
        exact
        component={RepositoryDashboard}
      />

      <ProtectedRoute path="/configuration" exact component={Configuration} />
      <Route path="/settings" exact component={Settings} />
      <Route path="/logs" exact component={LogsScreen} />

      <Route component={Error404} />
    </Switch>
  );
};

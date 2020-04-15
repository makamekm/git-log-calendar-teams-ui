import React from "react";
import { observer } from "mobx-react";
import { Route, Redirect, RouteProps } from "react-router";
import { AuthService } from "./AuthContext";

export const ProtectedRoute: React.FC<RouteProps> = observer(
  ({ component: Component, ...rest }) => {
    const authService = React.useContext(AuthService);
    return (
      <Route
        {...rest}
        render={(props) =>
          authService.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
);

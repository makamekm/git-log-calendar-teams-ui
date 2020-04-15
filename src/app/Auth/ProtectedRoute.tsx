import React from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { Route, Redirect, RouteProps } from "react-router";
import { AuthService } from "./AuthContext";

export const ProtectedRoute: React.FC<RouteProps> = observer(
  ({ component: Component, ...rest }) => {
    const authService = React.useContext(AuthService);
    const { pathname } = useLocation();
    return (
      <Route
        {...rest}
        render={(props) =>
          authService.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={"/login/" + pathname.replace(/\//gi, "_")} />
          )
        }
      />
    );
  }
);

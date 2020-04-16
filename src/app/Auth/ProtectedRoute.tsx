import React from "react";
import { useLocation } from "react-router";
import { Route, Redirect, RouteProps } from "react-router";
import { AuthService, getEncapsulatedPath } from "./AuthService";

export const ProtectedRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authService = React.useContext(AuthService);
  const { pathname } = useLocation();
  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login/" + getEncapsulatedPath(pathname)} />
        )
      }
    />
  );
};

import React from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router";
import { Route, Redirect, RouteProps } from "react-router";
import { AuthService, getEncapsulatedPath } from "./AuthService";
import { SHOW_WIP_MENU } from "@env/config";

export const ProtectedRoute: React.FC<
  RouteProps & {
    isWIP?: boolean;
  }
> = observer(({ component: Component, isWIP, ...rest }) => {
  const authService = React.useContext(AuthService);
  const { pathname } = useLocation();
  if (!SHOW_WIP_MENU && isWIP) {
    return <Redirect to="/404" />;
  }
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
});

import React from "react";
import { useLocalStore } from "mobx-react";
import { Route, Redirect, RouteProps } from "react-router";
import { AuthService, useFromPath, getEncapsulatedPath } from "./AuthService";

export const LogoutRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const state = useLocalStore(() => ({
    inited: false,
  }));
  const authService = React.useContext(AuthService);
  const from = useFromPath();
  React.useEffect(() => {
    authService.logout();
    state.inited = true;
  }, [authService, state]);
  const isReadyToRedirect = state.inited && !authService.isLoading;
  return (
    <Route
      {...rest}
      render={() => (
        <>
          {isReadyToRedirect && (
            <Redirect to={"/login/" + getEncapsulatedPath(from)} />
          )}
        </>
      )}
    />
  );
};

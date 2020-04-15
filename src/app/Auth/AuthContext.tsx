import React from "react";
import { useLocalStore } from "mobx-react";
import { useHistory, useLocation } from "react-router";
import { CONFIG_PIN } from "@env/config";
import { createService } from "~/components/ServiceProvider/ServiceProvider";

const DEV_PASSWORD = "12345";

export interface AuthState {
  from: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  authorize: (password: string) => Promise<string>;
  redirectToFrom: () => void;
  initAuthorize: () => Promise<void>;
}

const removeLoadinghandler = () => {
  var bodyElement = document.querySelector("body");
  var loaderElement = document.querySelector(".initial-loader-wrap");
  bodyElement.classList.add("loaded");
  setTimeout(function () {
    bodyElement.removeChild(loaderElement);
    bodyElement.classList.remove("loading", "loaded");
  }, 200);
};

export const useFromPath = () => {
  let { pathname } = useLocation();
  pathname = pathname && pathname.substr(pathname.indexOf("_"));
  pathname = pathname && pathname.replace(/_/gi, "/");
  return pathname;
};

export const AuthService = createService<AuthState>(
  () => {
    const history = useHistory();
    const state = useLocalStore<AuthState>(() => ({
      from: "",
      isAuthenticated: false,
      isLoading: false,
      error: "",
      authorize: async (password) => {
        state.error = "";
        state.isLoading = true;
        try {
          await new Promise((r) => setTimeout(r, 1000));
          state.isAuthenticated = CONFIG_PIN === password;
        } catch (error) {
          state.error = error.message;
        }
        state.isLoading = false;
        return state.error;
      },
      redirectToFrom: () => {
        if (state.isAuthenticated) {
          history.push(state.from || "/");
        }
      },
      initAuthorize: async () => {
        await state.authorize(DEV_PASSWORD);
        state.redirectToFrom();
        removeLoadinghandler();
      },
    }));
    return state;
  },
  () => {
    const context = React.useContext(AuthService);
    const from = useFromPath();
    context.from = from;
    React.useEffect(() => {
      context.initAuthorize();
    }, [context]);
  }
);

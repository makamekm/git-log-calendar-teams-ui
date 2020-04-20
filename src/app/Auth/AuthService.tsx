import React from "react";
import { useLocalStore } from "mobx-react";
import { useHistory, useLocation } from "react-router";
import { CONFIG_PIN, AUTO_LOGIN } from "@env/config";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { LoadingService } from "~/app/Loading/LoadingService";
import { useOnChange } from "~/hooks";

const PATH_ENCAPSULATION = "$\\";

export interface AuthState {
  history?: ReturnType<typeof useHistory>;
  from: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  authorize: (password: string) => Promise<string>;
  logout: () => Promise<string>;
  redirectToFrom: () => void;
  initAuthorize: () => Promise<void>;
}

const removeLoadinghandler = () => {
  const bodyElement = document.querySelector("body");
  const loaderElement = document.querySelector(".initial-loader-wrap");
  bodyElement.classList.add("loaded");
  setTimeout(() => {
    bodyElement.removeChild(loaderElement);
    bodyElement.classList.remove("loading", "loaded");
  }, 200);
};

export const getEncapsulatedPath = (pathname: string) => {
  return pathname.replace(/\//gi, PATH_ENCAPSULATION);
};

export const quoteRegExp = (str) => {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

export const useFromPath = () => {
  let { pathname } = useLocation();
  const symIndex = pathname.indexOf(PATH_ENCAPSULATION);
  if (symIndex >= 0) {
    pathname =
      pathname && pathname.substr(pathname.indexOf(PATH_ENCAPSULATION));
    pathname =
      pathname &&
      pathname.replace(new RegExp(quoteRegExp(PATH_ENCAPSULATION), "gi"), "/");
  }

  return pathname;
};

export const AuthService = createService<AuthState>(
  () => {
    const state = useLocalStore<AuthState>(() => ({
      from: "",
      isAuthenticated: false,
      isLoading: false,
      error: "",
      authorize: async (password) => {
        state.error = "";
        state.isLoading = true;
        try {
          // await new Promise((r) => setTimeout(r, 1000));
          state.isAuthenticated = CONFIG_PIN === password;
        } catch (error) {
          state.error = error.message;
        }
        state.isLoading = false;
        return state.error;
      },
      logout: async () => {
        state.error = "";
        state.isLoading = true;
        try {
          state.isAuthenticated = false;
        } catch (error) {
          state.error = error.message;
        }
        state.isLoading = false;
        return state.error;
      },
      redirectToFrom: () => {
        if (state.isAuthenticated) {
          state.history.push(state.from || "/");
        }
      },
      initAuthorize: async () => {
        await state.authorize(CONFIG_PIN);
        state.redirectToFrom();
        removeLoadinghandler();
      },
    }));
    return state;
  },
  () => {
    const context = React.useContext(AuthService);
    const appContext = React.useContext(LoadingService);

    const history = useHistory();
    context.history = history;

    const from = useFromPath();
    context.from = from;

    React.useEffect(() => {
      if (AUTO_LOGIN) {
        context.initAuthorize();
      } else {
        removeLoadinghandler();
      }
    }, [context]);

    useOnChange(context, "isLoading", (isLoading) =>
      appContext.setLoading(isLoading)
    );
  }
);

import React from "react";
import md5 from "md5";
import { useLocalStore } from "mobx-react";
import { useHistory, useLocation } from "react-router";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { LoadingService } from "../Loading/LoadingService";
import { useOnChange } from "~/hooks";
import { ipc } from "~/shared/ipc";

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
          const config = await ipc.handlers.GET_CONFIG();
          state.isAuthenticated =
            !config.password || config.password === md5(password);
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
        state.isLoading = true;
        const config = await ipc.handlers.GET_CONFIG();
        if (!config.password) {
          await state.authorize(config.password);
          state.redirectToFrom();
        }
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    const loadingService = React.useContext(LoadingService);

    const history = useHistory();
    state.history = history;

    const from = useFromPath();
    state.from = from;

    React.useEffect(() => {
      state.initAuthorize();
    }, [state]);

    useOnChange(state, "isLoading", (isLoading) => {
      loadingService.setLoading(isLoading, "AuthState");
    });
  }
);

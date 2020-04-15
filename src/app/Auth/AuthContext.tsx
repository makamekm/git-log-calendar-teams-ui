import React from "react";
import { useLocalStore } from "mobx-react";
import { CONFIG_PIN } from "@env/config";
import { createService } from "~/components/ServiceProvider/ServiceProvider";

const DEV_PASSWORD = "12345";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  authorize: (password: string) => Promise<void>;
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

export const AuthService = createService<AuthState>(
  () => {
    const state = useLocalStore<AuthState>(() => ({
      isAuthenticated: false,
      isLoading: false,
      error: "",
      authorize: async (password) => {
        console.log(state, password, CONFIG_PIN);
        state.isLoading = true;
        try {
          await new Promise((r) => setTimeout(r, 1000));
          state.isAuthenticated = CONFIG_PIN === password;
        } catch (error) {
          state.error = error.message;
        }
        state.isLoading = false;
      },
      initAuthorize: async () => {
        await state.authorize(DEV_PASSWORD);
        removeLoadinghandler();
      },
    }));
    return state;
  },
  () => {
    const context = React.useContext(AuthService);
    React.useEffect(() => {
      context.initAuthorize();
    }, [context]);
  }
);

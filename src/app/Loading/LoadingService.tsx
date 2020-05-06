import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnLoad, useOnChange } from "~/hooks";

export interface LoadingStore {
  inited: boolean;
  loaders: {
    [name: string]: boolean;
  };
  isLoading: boolean;
  setLoading: (value: boolean, name: string) => void;
}

const removeLoadinghandler = () => {
  const bodyElement = document.querySelector("body");
  const loaderElement = document.querySelector("#initializer");
  if (loaderElement) {
    bodyElement.removeChild(loaderElement);
  }
};

const INITIAL_DELAY = 100;

export const LoadingService = createService<LoadingStore>(
  () => {
    const store = useLocalStore<LoadingStore>(() => ({
      inited: false,
      loaders: {
        initial: true,
      },
      get isLoading() {
        return Object.keys(store.loaders).length > 0;
      },
      setLoading: (value, name) => {
        store.loaders[name] = value;
        if (!value) {
          delete store.loaders[name];
        }
      },
    }));
    return store;
  },
  (state) => {
    useOnLoad(() => {
      removeLoadinghandler();
    });
    useOnLoad(() => {
      delete state.loaders["initial"];
    }, INITIAL_DELAY);
    useOnChange(state, "isLoading", () => {
      if (!state.isLoading) {
        state.inited = true;
      }
    });
  }
);

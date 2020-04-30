import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnLoad, useOnChange } from "~/hooks";

export interface LoadingStore {
  inited: boolean;
  loaders: number;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
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
      loaders: 1,
      get isLoading() {
        return store.loaders > 0;
      },
      setLoading: (value) => {
        if (value) {
          store.loaders++;
        } else if (store.loaders > 0) {
          store.loaders--;
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
      state.loaders--;
    }, INITIAL_DELAY);
    useOnChange(state, "loaders", () => {
      if (!state.inited && state.loaders === 0) {
        state.inited = true;
      }
    });
  }
);

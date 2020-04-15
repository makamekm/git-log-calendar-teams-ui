import { useLocalStore } from "mobx-react";
import { createService } from "../../components/ServiceProvider/ServiceProvider";

export interface LoadingStore {
  loaders: number;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingService = createService<LoadingStore>(() => {
  const store = useLocalStore<LoadingStore>(() => ({
    loaders: 0,
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
});

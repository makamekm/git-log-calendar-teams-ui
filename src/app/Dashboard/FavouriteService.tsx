import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useSyncLocalStorage } from "~/hooks";

export interface FavouriteState {
  teams: string[];
  users: string[];
  repositories: string[];
}

export const FavouriteService = createService<FavouriteState>(
  () => {
    const state = useLocalStore<FavouriteState>(() => ({
      teams: [],
      users: [],
      repositories: [],
    }));
    return state;
  },
  () => {
    const state = React.useContext(FavouriteService);
    useSyncLocalStorage(state, "teams");
    useSyncLocalStorage(state, "users");
    useSyncLocalStorage(state, "repositories");
  }
);

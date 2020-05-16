import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useSyncLocalStorage, useOnLoadPathname, useOnChange } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc } from "~/shared/ipc";
import { AuthState, AuthService } from "../Auth/AuthService";

export type TrackerType = "repository" | "team" | "user";

export interface Tracker {
  name: string;
  type: TrackerType;
}

export const trackerMap = {
  repository: "Repositories",
  team: "Teams",
  user: "Users",
};

export interface FavouriteState {
  authService?: AuthState;
  config: Config;
  trackers: Tracker[];
  allTrackers: Tracker[];
  isLoading: boolean;
  addTracker(name: string, type: TrackerType): void;
  removeTracker(name: string, type: TrackerType): void;
  load: () => Promise<void>;
}

export const FavouriteService = createService<FavouriteState>(
  () => {
    const state = useLocalStore<FavouriteState>(() => ({
      config: null,
      trackers: [],
      isLoading: false,
      get allTrackers() {
        const arr = [];
        if (state.config) {
          for (const team of state.config.teams) {
            arr.push({
              id: team.name + "__team",
              name: team.name,
              type: "team",
            });
          }
          for (const user of state.config.users) {
            arr.push({
              id: user.name + "__user",
              name: user.name,
              type: "user",
            });
          }
          for (const repository of state.config.repositories) {
            arr.push({
              id: repository.name + "__repo",
              name: repository.name,
              type: "repository",
            });
          }
        }
        return arr;
      },
      addTracker(name, type) {
        state.removeTracker(name, type);
        state.trackers.unshift({ name, type });
      },
      removeTracker(name, type) {
        const index = state.trackers.findIndex(
          (s) => s.name === name && s.type === type
        );
        if (index >= 0) {
          state.trackers.splice(index, 1);
        }
      },
      load: async () => {
        if (!state.authService.isAuthenticated) {
          return;
        }
        state.isLoading = true;
        state.config = await ipc.handlers.GET_CONFIG();
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    state.authService = React.useContext(AuthService);
    useOnChange(state.authService, "isAuthenticated", state.load);
    useOnLoadPathname(state.load);
    useSyncLocalStorage(state, "trackers");
  }
);

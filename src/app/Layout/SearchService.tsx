import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnLoad, useOnChange } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc } from "~/shared/ipc";
import { debounce, groupBy } from "lodash";
import { AuthState, AuthService } from "../Auth/AuthService";

export type SearchType = "repository" | "team" | "user";

export interface SearchItem {
  name: string;
  type: SearchType;
}

export const searchMap = {
  repository: "Repositories",
  team: "Teams",
  user: "Users",
};

export const SearchService = createService(
  () => {
    const state = useLocalStore(() => ({
      authService: null as AuthState,
      config: null as Config,
      isLoading: false,
      isFocus: false,
      get items(): SearchItem[] {
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
      get searchItems() {
        const types = groupBy(state.items, "type");
        const items = Object.keys(types)
          .sort()
          .map((region) => {
            return {
              label: searchMap[region],
              id: region,
              values: types[region].map((s) => s.name),
            };
          });
        return items;
      },
      load: async () => {
        if (!state.authService.isAuthenticated) {
          return;
        }
        state.isLoading = true;
        state.config = await ipc.handlers.GET_CONFIG();
        state.isLoading = false;
      },
      reload: debounce(() => state.load(), 1000),
    }));
    return state;
  },
  (state) => {
    state.authService = React.useContext(AuthService);
    useOnLoad(state.load);
    useOnChange(state.authService, "isAuthenticated", state.load);
  }
);

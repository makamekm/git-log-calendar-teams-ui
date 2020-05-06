import { useContext } from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnLoad } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc } from "~/shared/ipc";
import { debounce } from "lodash";

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

export interface SearchState {
  config: Config;
  items: SearchItem[];
  isLoading: boolean;
  load: () => Promise<void>;
  reload: () => void;
}

export const SearchService = createService<SearchState>(
  () => {
    const state = useLocalStore<SearchState>(() => ({
      config: null,
      isLoading: false,
      get items() {
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
      load: async () => {
        state.isLoading = true;
        state.config = await ipc.handlers.GET_CONFIG();
        state.isLoading = false;
      },
      reload: debounce(() => state.load(), 1000),
    }));
    return state;
  },
  () => {
    const state = useContext(SearchService);
    useOnLoad(state.load);
  }
);

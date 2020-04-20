import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnChange, useDelay } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc } from "~/shared/ipc";

export interface DashboardState {
  config: Config;
  teamStats: {
    [team: string]: {
      day: string;
      value: number;
    }[];
  };
  isLoading: boolean;
  isLoadingDelay: boolean;
  limit: number;
  load: () => Promise<void>;
}

export const DashboardService = createService<DashboardState>(() => {
  const state = useLocalStore<DashboardState>(() => ({
    config: null,
    teamStats: {},
    isLoading: false,
    isLoadingDelay: false,
    limit: 30,
    load: async () => {
      state.isLoading = true;
      state.config = await ipc.handlers.GET_CONFIG();
      const data = await ipc.handlers.GET_CALENDAR_DATA(state.limit);
      const prepearedData = Object.keys(data).reduce((map, team) => {
        map[team] = Object.keys(data[team]).map((day) => ({
          day,
          value: data[team][day],
        }));
        return map;
      }, {});
      state.teamStats = prepearedData;
      state.isLoading = false;
    },
  }));

  useOnChange(state, "limit", state.load);
  useDelay(state, "isLoading", "isLoadingDelay");
  return state;
});

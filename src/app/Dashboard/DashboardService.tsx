import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnChange, useDelay, useOnLoadPathname } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc, Ipc } from "~/shared/ipc";
import { stat } from "fs";

export interface DashboardState {
  config: Config;
  teamStats: {
    [team: string]: {
      day: string;
      value: number;
    }[];
  };
  userStats: {
    [team: string]: {
      day: string;
      value: number;
    }[];
  };
  repositoriesStats: {
    [team: string]: {
      day: string;
      value: number;
    }[];
  };
  stats: ReturnType<Ipc["handlers"]["GET_STATS_DATA"]>;
  isLoading: boolean;
  isLoadingDelay: boolean;
  limit: number;
  load: () => Promise<void>;
}

const prepareDate = (data) => {
  return Object.keys(data).reduce((map, team) => {
    map[team] = Object.keys(data[team]).map((day) => ({
      day,
      value: data[team][day],
    }));
    return map;
  }, {});
};

export const DashboardService = createService<DashboardState>(
  () => {
    const state = useLocalStore<DashboardState>(() => ({
      config: null,
      teamStats: {},
      userStats: {},
      repositoriesStats: {},
      stats: null,
      isLoading: false,
      isLoadingDelay: false,
      limit: 30,
      load: async () => {
        state.isLoading = true;
        state.config = await ipc.handlers.GET_CONFIG();
        const teams = await ipc.handlers.GET_CALENDAR_DATA(
          state.limit,
          "teams"
        );
        const repositories = await ipc.handlers.GET_CALENDAR_DATA(
          state.limit,
          "repositories"
        );
        const users = await ipc.handlers.GET_CALENDAR_DATA(
          state.limit,
          "users"
        );
        const stats = await ipc.handlers.GET_STATS_DATA({
          limit: state.limit,
        });
        state.stats = stats;
        state.teamStats = prepareDate(teams);
        state.repositoriesStats = prepareDate(repositories);
        state.userStats = prepareDate(users);
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    useOnLoadPathname(state.load);
    useOnChange(state, "limit", state.load);
    useDelay(state, "isLoading", "isLoadingDelay");
  }
);

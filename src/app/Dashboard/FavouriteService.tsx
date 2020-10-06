import React from "react";
import { useLocalStore } from "mobx-react";
import moment from "moment";
import { createService } from "react-service-provider";
import { useSyncLocalStorage, useOnLoadPathname, useOnChange } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc } from "~/shared/ipc";
import { AuthState, AuthService } from "../Auth/AuthService";
import { DashboardService, DashboardState } from "./DashboardService";
import { groupBy } from "lodash";

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
  service: DashboardState;
  authService?: AuthState;
  config: Config;
  trackers: Tracker[];
  allTrackers: Tracker[];
  isLoading: boolean;
  addTracker(name: string, type: TrackerType): void;
  removeTracker(name: string, type: TrackerType): void;
  load: () => Promise<void>;
  activeUsersToday: number;
  activeUsers: number;
  activeRepositoriesToday: number;
  activeRepositories: number;
  activeTeamsToday: number;
  activeTeams: number;
  topUsers: {
    name: string;
    value: number;
  }[];
  topRepositories: {
    name: string;
    value: number;
  }[];
  topTeams: {
    name: string;
    value: number;
  }[];
  groupped: {
    user?: {
      name: string;
    }[];
    repository?: {
      name: string;
    }[];
    team?: {
      name: string;
    }[];
  };
  teamCompareStats: ({
    day: string;
  } & {
    [name: string]: number;
  })[];
  userCompareStats: ({
    day: string;
  } & {
    [name: string]: number;
  })[];
  repositoryCompareStats: ({
    day: string;
  } & {
    [name: string]: number;
  })[];
}

export const FavouriteService = createService<FavouriteState>(
  () => {
    const state: FavouriteState = useLocalStore<FavouriteState>(() => ({
      service: null,
      config: null,
      trackers: [],
      isLoading: false,
      get groupped() {
        return state.trackers ? groupBy(state.trackers, "type") : {};
      },
      get repositoryCompareStats() {
        const result: {
          [day: string]: {
            day: string;
          } & any;
        } = {};
        state.groupped.repository.forEach(({ name }) => {
          const date = state.service.repositoriesStats[name];
          if (date) {
            date.forEach((data) => {
              if (!result[data.day]) {
                result[data.day] = {
                  day: data.day,
                  [name]: data.value,
                };
              } else {
                result[data.day][name] = data.value;
              }
            });
          }
        });
        return Object.values(result);
      },
      get userCompareStats() {
        const result: {
          [day: string]: {
            day: string;
          } & any;
        } = {};
        state.groupped.user.forEach(({ name }) => {
          const date = state.service.userStats[name];
          if (date) {
            date.forEach((data) => {
              if (!result[data.day]) {
                result[data.day] = {
                  day: data.day,
                  [name]: data.value,
                };
              } else {
                result[data.day][name] = data.value;
              }
            });
          }
        });
        return Object.values(result);
      },
      get teamCompareStats() {
        const result: {
          [day: string]: {
            day: string;
          } & any;
        } = {};
        state.groupped.team.forEach(({ name }) => {
          const date = state.service.teamStats[name];
          if (date) {
            date.forEach((data) => {
              if (!result[data.day]) {
                result[data.day] = {
                  day: data.day,
                  [name]: data.value,
                };
              } else {
                result[data.day][name] = data.value;
              }
            });
          }
        });
        return Object.values(result);
      },
      get activeUsers() {
        return (
          state.groupped.user?.reduce((a, { name }) => {
            const value = state.service?.userStats[name]?.reduce(
              (a, v) => a + v.value,
              0
            );
            return value ? a + 1 : a;
          }, 0) || 0
        );
      },
      get activeUsersToday() {
        const today = moment().format("YYYY-MM-DD");
        return (
          state.groupped.user?.reduce((a, { name }) => {
            const value = state.service?.userStats[name]?.reduce((a, v) => {
              return today === v.day ? a + v.value : a;
            }, 0);
            return value ? a + 1 : a;
          }, 0) || 0
        );
      },
      get activeRepositories() {
        return (
          state.groupped.repository?.reduce((a, { name }) => {
            const value = state.service?.repositoriesStats[name]?.reduce(
              (a, v) => a + v.value,
              0
            );
            return value ? a + 1 : a;
          }, 0) || 0
        );
      },
      get activeRepositoriesToday() {
        const today = moment().format("YYYY-MM-DD");
        return (
          state.groupped.repository?.reduce((a, { name }) => {
            const value = state.service?.repositoriesStats[name]?.reduce(
              (a, v) => {
                return today === v.day ? a + v.value : a;
              },
              0
            );
            return value ? a + 1 : a;
          }, 0) || 0
        );
      },
      get activeTeams() {
        return (
          state.groupped.team?.reduce((a, { name }) => {
            const value = state.service?.teamStats[name]?.reduce(
              (a, v) => a + v.value,
              0
            );
            return value ? a + 1 : a;
          }, 0) || 0
        );
      },
      get activeTeamsToday() {
        const today = moment().format("YYYY-MM-DD");
        return (
          state.groupped.team?.reduce((a, { name }) => {
            const value = state.service?.teamStats[name]?.reduce((a, v) => {
              return today === v.day ? a + v.value : a;
            }, 0);
            return value ? a + 1 : a;
          }, 0) || 0
        );
      },
      get topUsers() {
        const result = state.groupped.user?.map(({ name }) => {
          return {
            name,
            value: state.service?.userStats[name]?.reduce(
              (a, v) => a + v.value,
              0
            ),
          };
        });
        return result || [];
      },
      get topRepositories() {
        const result = state.groupped.repository?.map(({ name }) => {
          return {
            name,
            value: state.service?.repositoriesStats[name]?.reduce(
              (a, v) => a + v.value,
              0
            ),
          };
        });
        return result || [];
      },
      get topTeams() {
        const result = state.groupped.team?.map(({ name }) => {
          return {
            name,
            value: state.service?.teamStats[name]?.reduce(
              (a, v) => a + v.value,
              0
            ),
          };
        });
        return result || [];
      },
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
    state.service = React.useContext(DashboardService);
    useOnChange(state.authService, "isAuthenticated", state.load);
    useOnLoadPathname(state.load);
    useSyncLocalStorage(state, "trackers");
  }
);

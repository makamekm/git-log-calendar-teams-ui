import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnChange, useDelay, useSimpleSyncLocalStorage } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc, IpcHandler } from "~/shared/ipc";
import { MessageState, MessageService } from "./MessageService";
import {
  RepositoryUserState,
  RepositoryUserService,
} from "./RepositoryUserService";
import { AuthService, AuthState } from "../Auth/AuthService";

export interface DashboardState {
  authService?: AuthState;
  messageService?: MessageState;
  repositoryUserService?: RepositoryUserState;
  config: Config;
  maxValue: number;
  maxValueDelay: number;
  mode: "team" | "repository" | "user";
  name: string;
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
  users: string[];
  repositories: string[];
  teams: string[];
  stats: ReturnType<IpcHandler["GET_STATS_DATA"]>;
  isLoading: boolean;
  limit: number;
  calcMaxValue: () => void;
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
    const state: DashboardState = useLocalStore<DashboardState>(() => ({
      config: null,
      maxValue: 0,
      maxValueDelay: 0,
      mode: null,
      name: null,
      teamStats: {},
      userStats: {},
      repositoriesStats: {},
      stats: null,
      isLoading: false,
      limit: 30,
      get repositoryCompareStats() {
        const result: {
          [day: string]: {
            day: string;
          } & any;
        } = {};
        state.repositories.forEach((user) => {
          const date = state.repositoriesStats[user];
          if (date) {
            date.forEach((data) => {
              if (!result[data.day]) {
                result[data.day] = {
                  day: data.day,
                  [user]: data.value,
                };
              } else {
                result[data.day][user] = data.value;
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
        state.users.forEach((user) => {
          const date = state.userStats[user];
          if (date) {
            date.forEach((data) => {
              if (!result[data.day]) {
                result[data.day] = {
                  day: data.day,
                  [user]: data.value,
                };
              } else {
                result[data.day][user] = data.value;
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
        state.teams.forEach((user) => {
          const date = state.teamStats[user];
          if (date) {
            date.forEach((data) => {
              if (!result[data.day]) {
                result[data.day] = {
                  day: data.day,
                  [user]: data.value,
                };
              } else {
                result[data.day][user] = data.value;
              }
            });
          }
        });
        return Object.values(result);
      },
      get users() {
        const result: string[] = [];
        state.config &&
          state.config.users.forEach((user) => {
            if (state.mode === "team") {
              if (
                state.config.teams.find(
                  (t) =>
                    !t.invert &&
                    state.name === t.name &&
                    t.users &&
                    t.users.includes(user.name)
                )
              ) {
                result.push(user.name);
              }
            } else if (state.mode === "repository" && state.userStats) {
              if (
                state.userStats[user.name] &&
                state.userStats[user.name].length > 0
              ) {
                result.push(user.name);
              }
            }
          });
        return result;
      },
      get teams() {
        const result: string[] = [];
        state.config &&
          state.config.teams.forEach((team) => {
            if (state.mode === "user" && team.users) {
              if (
                state.config.users.find(
                  (u) => state.name === u.name && team.users.includes(u.name)
                )
              ) {
                result.push(team.name);
              }
            } else if (state.mode === "repository" && state.teamStats) {
              if (
                state.teamStats[team.name] &&
                state.teamStats[team.name].length > 0
              ) {
                result.push(team.name);
              }
            }
          });
        return result;
      },
      get repositories() {
        return state.repositoriesStats
          ? Object.keys(state.repositoriesStats).filter(
              (r) => state.repositoriesStats[r].length > 0
            )
          : [];
      },
      calcMaxValue() {
        let data: typeof state.repositoriesStats[0] = [];
        if (state.mode === "repository") {
          data = state.repositoriesStats[state.name];
        } else if (state.mode === "team") {
          data = state.teamStats[state.name];
        } else if (state.mode === "user") {
          data = state.userStats[state.name];
        }
        let max = 0;
        let total = 0;
        const sorted = data
          .map(({ value }) => {
            max = max > value ? max : value;
            total += value;
            return value;
          })
          .sort((a, b) => b - a);
        const avg = total / data.length;
        let result = 0;
        sorted.forEach((value) => {
          if (!result && value < avg) {
            result = value * 1.1;
          }
        });
        state.maxValue = result;
        state.maxValueDelay = state.maxValue;
      },
      load: async () => {
        if (!state.authService.isAuthenticated) {
          return;
        }
        state.isLoading = true;
        state.config = await ipc.handlers.GET_CONFIG();
        state.stats = await ipc.handlers.GET_STATS_DATA({
          limit: state.limit,
          mode: state.mode,
          name: state.name,
        });
        state.teamStats = prepareDate(
          await ipc.handlers.GET_CALENDAR_DATA("teams", {
            limit: state.limit,
            mode: state.mode,
            name: state.name,
          })
        );
        state.repositoriesStats = prepareDate(
          await ipc.handlers.GET_CALENDAR_DATA("repositories", {
            limit: state.limit,
            mode: state.mode,
            name: state.name,
          })
        );
        state.userStats = prepareDate(
          await ipc.handlers.GET_CALENDAR_DATA("users", {
            limit: state.limit,
            mode: state.mode,
            name: state.name,
          })
        );
        await state.repositoryUserService.load();
        await state.messageService.load();
        state.calcMaxValue();
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    state.authService = React.useContext(AuthService);
    state.messageService = React.useContext(MessageService);
    state.repositoryUserService = React.useContext(RepositoryUserService);
    useOnChange(state, "limit", state.load);
    useOnChange(state.authService, "isAuthenticated", state.load);
    useDelay(state, "maxValue", "maxValueDelay", 1000);
    // useSimpleSyncLocalStorage(state, "maxValue", "maxValue");
    // useSimpleSyncLocalStorage(state, "maxValueDelay", "maxValueDelay");
    React.useEffect(() => ipc.channels.ON_DRIVE_UPDATE(state.load));
    React.useEffect(() => ipc.channels.ON_COLLECT_FINISH(state.load));
    React.useEffect(() => ipc.channels.ON_CONFIG_UPDATE_FINISHED(state.load));
  }
);

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

export interface DashboardState {
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
      isLoadingDelay: false,
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
      load: async () => {
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
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    state.messageService = React.useContext(MessageService);
    state.repositoryUserService = React.useContext(RepositoryUserService);
    useOnChange(state, "limit", state.load);
    useDelay(state, "isLoading", "isLoadingDelay");
    useDelay(state, "maxValue", "maxValueDelay");
    useSimpleSyncLocalStorage(state, "maxValue", "maxValue");
    useSimpleSyncLocalStorage(state, "maxValueDelay", "maxValueDelay");
    React.useEffect(() => ipc.channels.ON_DRIVE_UPDATE(state.load));
    React.useEffect(() => ipc.channels.ON_COLLECT_FINISH(state.load));
  }
);

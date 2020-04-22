import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useOnChange, useDelay } from "~/hooks";
import { Config } from "~/shared/Config";
import { ipc, Ipc } from "~/shared/ipc";
import { MessageState, MessageService } from "./MessageService";

export interface DashboardState {
  messageService?: MessageState;
  config: Config;
  maxValue: number;
  mode: "team" | "repository" | "user";
  name: string;
  repositoryUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
  }[];
  usersQuery: string;
  usersQueryDelay: string;
  tableRepositoryUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
  }[];
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
  users: string[];
  repositories: string[];
  teams: string[];
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
    const state: DashboardState = useLocalStore<DashboardState>(() => ({
      config: null,
      maxValue: 0,
      mode: null,
      name: null,
      teamStats: {},
      userStats: {},
      repositoriesStats: {},
      repositoryUsers: [],
      stats: null,
      isLoading: false,
      isLoadingDelay: false,
      limit: 30,
      usersQuery: "",
      usersQueryDelay: "",
      get tableRepositoryUsers() {
        return state.usersQueryDelay
          ? state.repositoryUsers.filter((user) => {
              return user.userKey
                .toLowerCase()
                .includes(state.usersQueryDelay.toLowerCase());
            })
          : state.repositoryUsers;
      },
      get users() {
        const result: string[] = [];
        state.config &&
          state.config.users.forEach((user) => {
            if (state.mode === "team") {
              if (
                state.config.teams.find(
                  (t) =>
                    state.name === t.name &&
                    t.users &&
                    t.users.includes(user.name)
                )
              ) {
                result.push(user.name);
              }
            } else if (state.mode === "repository" && state.userStats) {
              if (Object.keys(state.userStats).find((n) => n === user.name)) {
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
              if (Object.keys(state.teamStats).find((n) => n === team.name)) {
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
        if (state.mode === "repository") {
          state.repositoryUsers = await ipc.handlers.GET_REPOSITORY_USERS([
            state.name,
          ]);
        }
        await state.messageService.load();
        state.isLoading = false;
      },
    }));
    return state;
  },
  (state) => {
    state.messageService = React.useContext(MessageService);
    useOnChange(state, "limit", state.load);
    useDelay(state, "isLoading", "isLoadingDelay");
    useDelay(state, "usersQuery", "usersQueryDelay");
  }
);

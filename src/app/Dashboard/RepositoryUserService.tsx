import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "react-service-provider";
import { useDelay } from "~/hooks";
import { ipc } from "~/shared/ipc";
import { DashboardService, DashboardState } from "./DashboardService";

export interface RepositoryUserState {
  dashboardService?: DashboardState;
  repositoryUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
    valueTotal: number;
  }[];
  usersQuery: string;
  usersQueryDelay: string;
  sortBy: string;
  sortDirectionDesc: boolean;
  tableRepositoryUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
    valueTotal: number;
  }[];
  isLoading: boolean;
  load: () => Promise<void>;
}

export const RepositoryUserService = createService<RepositoryUserState>(
  () => {
    const state: RepositoryUserState = useLocalStore<RepositoryUserState>(
      () => ({
        repositoryUsers: [],
        isLoading: false,
        usersQuery: "",
        usersQueryDelay: "",
        sortBy: "value",
        sortDirectionDesc: true,
        get tableRepositoryUsers() {
          let values = state.usersQueryDelay
            ? state.repositoryUsers.filter((user) => {
                return user.userKey
                  .toLowerCase()
                  .includes(state.usersQueryDelay.toLowerCase());
              })
            : state.repositoryUsers;
          values = values
            .slice()
            .sort(
              (a, b) =>
                (a[state.sortBy] - b[state.sortBy]) *
                (state.sortDirectionDesc ? -1 : 1)
            );
          return values;
        },
        load: async () => {
          if (state.dashboardService.mode === "repository") {
            state.isLoading = true;
            state.repositoryUsers = await ipc.handlers.GET_REPOSITORY_USERS(
              [state.dashboardService.name],
              state.dashboardService.limit
            );
            state.isLoading = false;
          }
        },
      })
    );
    return state;
  },
  (state) => {
    state.dashboardService = React.useContext(DashboardService);
    useDelay(state, "usersQuery", "usersQueryDelay");
  }
);

import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
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
  isLoading: boolean;
  isLoadingDelay: boolean;
  load: () => Promise<void>;
}

export const RepositoryUserService = createService<RepositoryUserState>(
  () => {
    const state: RepositoryUserState = useLocalStore<RepositoryUserState>(
      () => ({
        repositoryUsers: [],
        isLoading: false,
        isLoadingDelay: false,
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
        load: async () => {
          if (state.dashboardService.mode === "repository") {
            state.isLoading = true;
            state.repositoryUsers = await ipc.handlers.GET_REPOSITORY_USERS([
              state.dashboardService.name,
            ]);
            state.isLoading = false;
          }
        },
      })
    );
    return state;
  },
  (state) => {
    state.dashboardService = React.useContext(DashboardService);
    useDelay(state, "isLoading", "isLoadingDelay");
    useDelay(state, "usersQuery", "usersQueryDelay");
  }
);

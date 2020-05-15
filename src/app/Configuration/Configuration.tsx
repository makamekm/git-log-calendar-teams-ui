import React from "react";
import classNames from "classnames";
import { toJS } from "mobx";
import { useLocalStore, observer } from "mobx-react";

import { HeaderMain } from "../HeaderMain";
import { ipc } from "~/shared/ipc";
import { useIsDirty, useDelay, useOnLoad } from "~/hooks";
import { ConfigurationState } from "./ConfigurationState";
import { ConfigurationTeams } from "./ConfigurationTeams";
import { ConfigurationUsers } from "./ConfigurationUsers";
import { ConfigurationRepositories } from "./ConfigurationRepositories";
import { ConfigurationForm } from "./ConfigurationForm";
import { ConfigurationAllUsers } from "./ConfigurationAllUsers";
import { useLayoutConfig } from "~/components/Layout/LayoutService";

export const Configuration = observer(() => {
  const state = useLocalStore<ConfigurationState>(() => ({
    isDirty: false,
    config: null,
    isLoading: false,
    allUsers: [],
    usersQuery: "",
    usersQueryDelay: "",
    get allUsersQueryed() {
      return state.allUsers.filter((user) => {
        return user.userKey.includes(state.usersQueryDelay);
      });
    },
    get excludes() {
      let arr: string[] = [];
      if (state.config) {
        state.config.repositories.forEach((repository) => {
          repository.exclude.forEach((s) => {
            if (!arr.includes(s)) {
              arr.push(s);
            }
          });
        });
      }
      return arr;
    },
    get users() {
      let arr: string[] = [];
      if (state.config) {
        state.config.users.forEach((user) => {
          if (!arr.includes(user.name)) {
            arr.push(user.name);
          }
        });
      }
      return arr;
    },
    get repositories() {
      let arr: string[] = [];
      if (state.config) {
        state.config.repositories.forEach((repository) => {
          if (!arr.includes(repository.name)) {
            arr.push(repository.name);
          }
        });
      }
      return arr;
    },
    get usedAssociations() {
      let arr: string[] = [];
      if (state.config) {
        state.config.users.forEach((user) => {
          user.associations.forEach((s) => {
            if (!arr.includes(s)) {
              arr.push(s);
            }
          });
        });
      }
      return arr;
    },
    get associations() {
      let arr: string[] = [];
      state.allUsers.forEach((user) => {
        if (
          !state.usedAssociations.includes(user.email) &&
          !arr.includes(user.email)
        ) {
          arr.push(user.email);
        }
        if (
          !state.usedAssociations.includes(user.name) &&
          !arr.includes(user.name)
        ) {
          arr.push(user.name);
        }
      });
      return arr;
    },
    load: async () => {
      state.isLoading = true;
      state.config = await ipc.handlers.GET_CONFIG(true);
      state.allUsers = await ipc.handlers.GET_REPOSITORY_USERS();
      state.isDirty = false;
      state.isLoading = false;
    },
    save: async () => {
      if (!state.isDirty) {
        return;
      }
      state.isLoading = true;
      await ipc.handlers.SAVE_CONFIG(toJS(state.config));
      state.config = await ipc.handlers.GET_CONFIG(true);
      state.allUsers = await ipc.handlers.GET_REPOSITORY_USERS();
      state.isDirty = false;
      state.isLoading = false;
    },
  }));

  useOnLoad(state.load);
  useIsDirty(state, "config");
  useDelay(state, "usersQuery", "usersQueryDelay");
  useLayoutConfig({
    pageTitle: "Configuration",
    breadcrumbs: [
      {
        name: "Configuration",
      },
    ],
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-4 md:pb-4">
        <HeaderMain title="Configuration" />
        <div className="ml-auto my-3">
          <button
            className={classNames(
              "text-base font-semibold py-2 px-3 mx-2 rounded-lg bg-blue-500 active:bg-blue-700 text-white hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              {
                "pointer-events-none opacity-50":
                  !state.isDirty || state.isLoading,
              }
            )}
            disabled={!state.isDirty || state.isLoading}
            onClick={state.save}
          >
            Apply
          </button>
          <button
            className={classNames(
              "text-base font-normal py-2 px-3 mx-2 rounded-lg border dark-mode:border-gray-500 text-gray-700 dark-mode:text-gray-300 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            )}
            onClick={state.load}
          >
            Reset
          </button>
        </div>
      </div>

      <ConfigurationForm state={state} />
      <ConfigurationTeams state={state} />
      <ConfigurationRepositories state={state} />
      <ConfigurationUsers state={state} />
      <ConfigurationAllUsers state={state} />
    </>
  );
});

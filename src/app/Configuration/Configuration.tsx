import React from "react";
import classNames from "classnames";
import { toJS } from "mobx";
import { useLocalStore, observer } from "mobx-react";
import { toast } from "react-toastify";

import { HeaderMain } from "~/components/Blocks/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useIsDirty, useDelay, useOnLoad } from "~/hooks";
import { ConfigurationState } from "./ConfigurationState";
import { ConfigurationTeams } from "./ConfigurationTeams";
import { ConfigurationUsers } from "./ConfigurationUsers";
import { ConfigurationRepositories } from "./ConfigurationRepositories";
import { ConfigurationForm } from "./ConfigurationForm";
import { ConfigurationAllUsers } from "./ConfigurationAllUsers";
import { useLayoutConfig } from "~/components/Layout/LayoutService";
import { Config } from "~/shared/Config";

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
    prepareConfig(config: Config) {
      config.users.forEach((u) => {
        u.refName = u.name;
      });
      config.repositories.forEach((u) => {
        u.refName = u.name;
      });
      return config;
    },
    verify(config: Config) {
      let errors: string[] = [];
      const usedTeamDuplicates: string[] = [];
      config.teams.forEach((t) => {
        if (
          config.teams.filter((tt) => tt.name === t.name).length > 1 &&
          !usedTeamDuplicates.includes(t.name)
        ) {
          errors.push("The team name has duplicates: " + t.name);
          usedTeamDuplicates.push(t.name);
        }
      });
      const usedUserDuplicates: string[] = [];
      config.users.forEach((t) => {
        if (
          config.users.filter((tt) => tt.name === t.name).length > 1 &&
          !usedUserDuplicates.includes(t.name)
        ) {
          errors.push("The user name has duplicates: " + t.name);
          usedUserDuplicates.push(t.name);
        }
      });
      const usedRepositoryDuplicates: string[] = [];
      config.repositories.forEach((t) => {
        if (
          config.repositories.filter((tt) => tt.name === t.name).length > 1 &&
          !usedRepositoryDuplicates.includes(t.name)
        ) {
          errors.push("The repository name has duplicates: " + t.name);
          usedRepositoryDuplicates.push(t.name);
        }
      });
      return errors;
    },
    prepareSaveConfig(config: Config) {
      config.teams.forEach((t) => {
        t.users = t.users.map((name) => {
          const u = config.users.find((u) => u.refName === name);
          if (u) {
            return u.name;
          } else {
            return name;
          }
        });
        t.repositories = t.repositories.map((name) => {
          const u = config.repositories.find((u) => u.refName === name);
          if (u) {
            return u.name;
          } else {
            return name;
          }
        });
      });
      config.users.forEach((u) => {
        delete u.refName;
      });
      config.repositories.forEach((u) => {
        delete u.refName;
      });
      return config;
    },
    load: async () => {
      state.isLoading = true;
      state.config = state.prepareConfig(await ipc.handlers.GET_CONFIG(true));
      state.allUsers = await ipc.handlers.GET_REPOSITORY_USERS();
      state.isDirty = false;
      state.isLoading = false;
    },
    save: async () => {
      if (!state.isDirty) {
        return;
      }
      const errors = state.verify(toJS(state.config));
      if (errors.length === 0) {
        state.isLoading = true;
        await ipc.handlers.SAVE_CONFIG(
          state.prepareSaveConfig(toJS(state.config))
        );
        state.config = state.prepareConfig(await ipc.handlers.GET_CONFIG(true));
        state.allUsers = await ipc.handlers.GET_REPOSITORY_USERS();
        state.isDirty = false;
        state.isLoading = false;
      } else {
        errors.forEach((error) => {
          toast(error, {
            type: "error",
          });
        });
      }
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

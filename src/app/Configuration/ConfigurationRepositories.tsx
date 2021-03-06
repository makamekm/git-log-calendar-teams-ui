import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import { ConfigurationState } from "./ConfigurationState";
import {
  ConfigurationTable,
  ConfigurationTableProps,
} from "./ConfigurationTable";
import { Accordion } from "~/components/Accordion/Accordion";
import { Typeahead } from "~/components/Typeahead/Typeahead";
import { Dropdown } from "~/components/Dropdown/Dropdown";
import { Toggle } from "~/components/Toggle/Toggle";

const ConfigurationTableRepositories = ConfigurationTable as React.FC<
  ConfigurationTableProps<ConfigurationState["config"]["repositories"][0]>
>;

export const ConfigurationRepositories = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion
        syncStorageName="configurationRepositoriesAccordion"
        className="mb-3"
        title={
          <div className="flex justify-between items-center w-full">
            <div>
              Repositories
              <span className="text-sm ml-2 text-gray-600">#1.02</span>
            </div>

            <button
              className="text-xs font-normal border py-1 px-3 rounded-lg dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                state.config.repositories.unshift({
                  id: String(Math.random() * 10000),
                  url: "",
                  name: "",
                  branch: "",
                  exclude: [],
                });
              }}
            >
              <i className="fa fa-plus mr-2"></i>Add
            </button>
          </div>
        }
      >
        {!state.config || state.isLoading ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <ConfigurationTableRepositories
            items={state.config.repositories}
            header={
              <>
                <th>Name</th>
                <th>Url</th>
                <th>Branch</th>
                <th>Hard Reset</th>
                <th>Excludes</th>
                <th className="text-right w-20">Actions</th>
              </>
            }
            render={(repository) => (
              <>
                <td className="align-middle">
                  <input
                    autoComplete={"off"}
                    className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      repository.name = e.currentTarget.value;
                    }}
                    value={repository.name}
                    placeholder="Name (Required & Unique)..."
                  />
                </td>
                <td className="align-middle">
                  <input
                    autoComplete={"off"}
                    className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      repository.url = e.currentTarget.value;
                    }}
                    value={repository.url}
                    placeholder="Url (Required)..."
                  />
                </td>
                <td className="align-middle">
                  <input
                    autoComplete={"off"}
                    className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      repository.branch = e.currentTarget.value;
                    }}
                    value={repository.branch}
                    placeholder="Branch (Optional)..."
                  />
                </td>
                <td
                  className="align-middle text-center"
                  style={{ maxWidth: "300px" }}
                >
                  <Toggle
                    checked={!!repository.cleanTmp}
                    onChange={() => {
                      repository.cleanTmp = !repository.cleanTmp;
                    }}
                  />
                </td>
                <td className="align-middle" style={{ maxWidth: "300px" }}>
                  <Typeahead
                    placeholder="Add exclusions..."
                    multiple
                    allowNew
                    autoFocus
                    selected={repository.exclude}
                    onChange={(selected) => {
                      (repository.exclude as any).replace(selected);
                    }}
                    options={state.excludes}
                  />
                </td>
                <td className="align-middle text-right w-20">
                  <Dropdown title={<i className="fas fa-cog"></i>}>
                    <button
                      className={
                        "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      }
                      onClick={() => {
                        state.config.repositories.splice(
                          state.config.repositories.indexOf(repository),
                          1
                        );
                      }}
                    >
                      <i className="fa fa-fw fa-trash mr-2"></i>
                      Delete
                    </button>
                  </Dropdown>
                </td>
              </>
            )}
          />
        )}
      </Accordion>
    );
  }
);

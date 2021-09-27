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

const ConfigurationTableTeams = ConfigurationTable as React.FC<
  ConfigurationTableProps<ConfigurationState["config"]["teams"][0]>
>;

export const ConfigurationTeams = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion
        className="mb-3"
        syncStorageName="configurationTeamsAccordion"
        initialOpen
        title={
          <div className="flex justify-between items-center w-full">
            <div>
              Teams
              <span className="text-sm ml-2 text-gray-600">#1.01</span>
            </div>

            <button
              className="text-xs font-normal border py-1 px-3 rounded-lg dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                state.config.teams.unshift({
                  id: String(Math.random() * 10000),
                  name: "",
                  invert: false,
                  users: [],
                  repositories: [],
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
          <ConfigurationTableTeams
            items={state.config.teams}
            header={
              <>
                <th className="w-5/12">Name</th>
                <th className="">Users</th>
                <th className="text-right w-10">Actions</th>
              </>
            }
            render={(team) => (
              <>
                <td className="align-middle w-5/12">
                  <input
                    autoComplete={"off"}
                    className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      team.name = e.currentTarget.value;
                    }}
                    value={team.name}
                    placeholder="Name (Required & Unique)..."
                  />
                </td>
                <td
                  className="align-middle"
                  style={{
                    maxWidth: "300px",
                  }}
                >
                  <Typeahead
                    placeholder="Add repositories..."
                    multiple
                    autoFocus
                    selected={team.repositories}
                    onChange={(selected) => {
                      (team.repositories as any).replace(selected);
                    }}
                    options={state.repositories}
                  />
                </td>
                <td className="align-middle text-right w-10">
                  <Dropdown title={<i className="fas fa-cog"></i>}>
                    <button
                      className={
                        "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      }
                      onClick={() => {
                        state.config.teams.splice(
                          state.config.teams.indexOf(team),
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
            renderAdditional={(team, style, className) => (
              <tr style={{ ...style }} className={className}>
                <td colSpan={4}>
                  <Typeahead
                    placeholder="Add users..."
                    multiple
                    allowNew
                    autoFocus
                    selected={team.users}
                    onChange={(selected) => {
                      (team.users as any).replace(selected);
                    }}
                    options={state.users}
                  />
                </td>
              </tr>
            )}
          />
        )}
      </Accordion>
    );
  }
);

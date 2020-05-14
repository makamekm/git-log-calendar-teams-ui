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

const ConfigurationTableUsers = ConfigurationTable as React.FC<
  ConfigurationTableProps<ConfigurationState["config"]["users"][0]>
>;

export const ConfigurationUsers = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion
        className="mb-3"
        title={
          <div className="flex justify-between items-center w-full">
            <div>
              Users
              <span className="text-sm ml-2 text-gray-600">#1.03</span>
            </div>
            <button
              className="text-xs font-normal border py-1 px-3 rounded-lg dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                e.stopPropagation();
                state.config.users.unshift({
                  id: String(Math.random() * 10000),
                  name: "",
                  associations: [],
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
          <ConfigurationTableUsers
            items={state.config.users}
            header={
              <>
                <th>Name</th>
                <th>Associations</th>
                <th className="text-right">Actions</th>
              </>
            }
            render={(user) => (
              <>
                <td>
                  <input
                    className="w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker leading-none focus:outline-none focus:shadow-outline"
                    type="text"
                    onChange={(e) => {
                      user.name = e.currentTarget.value;
                    }}
                    value={user.name}
                    placeholder="Name (Required & Unique)..."
                  />
                </td>
                <td style={{ maxWidth: "300px" }}>
                  <Typeahead
                    placeholder="Add associations..."
                    multiple
                    allowNew
                    autoFocus
                    selected={user.associations as any}
                    onChange={(selected) => {
                      (user.associations as any).replace(selected);
                    }}
                    options={state.associations}
                  />
                </td>
                <td className="text-right">
                  <Dropdown title={<i className="fas fa-cog"></i>}>
                    <button
                      className={
                        "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      }
                      onClick={() => {
                        state.config.users.splice(
                          state.config.users.indexOf(user),
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

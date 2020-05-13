import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Typeahead } from "react-bootstrap-typeahead";

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  Button,
  Input,
  DropdownMenu,
} from "~/components";
import { ConfigurationState } from "./ConfigurationState";
import {
  ConfigurationTable,
  ConfigurationTableProps,
} from "./ConfigurationTable";
import { Accordion } from "~/components/Accordion/Accordion";

const ConfigurationTableRepositories = ConfigurationTable as React.FC<
  ConfigurationTableProps<ConfigurationState["config"]["repositories"][0]>
>;

export const ConfigurationRepositories = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion
        className="mb-3"
        title={
          <div className="flex justify-between items-center w-full">
            <div>
              Repositories
              <span className="text-sm ml-2 text-gray-600">#1.02</span>
            </div>
            <Button
              outline
              size="sm"
              className="ml-auto align-self-end"
              onClick={(e) => {
                e.stopPropagation();
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
            </Button>
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
                <th className="bt-0">Name</th>
                <th className="bt-0">Url</th>
                <th className="bt-0">Branch</th>
                <th className="bt-0">Excludes</th>
                <th className="text-right bt-0">Actions</th>
              </>
            }
            render={(repository) => (
              <>
                <td className="align-middle">
                  <Input
                    type="text"
                    onChange={(e) => {
                      repository.name = e.currentTarget.value;
                    }}
                    value={repository.name}
                    placeholder="Name (Required & Unique)..."
                  />
                </td>
                <td className="align-middle">
                  <Input
                    type="text"
                    onChange={(e) => {
                      repository.url = e.currentTarget.value;
                    }}
                    value={repository.url}
                    placeholder="Url (Required)..."
                  />
                </td>
                <td className="align-middle">
                  <Input
                    type="text"
                    onChange={(e) => {
                      repository.branch = e.currentTarget.value;
                    }}
                    value={repository.branch}
                    placeholder="Branch (Optional)..."
                  />
                </td>
                <td
                  className="align-middle"
                  style={{ maxWidth: "300px", overflow: "hidden" }}
                >
                  <Typeahead
                    id="exclusions"
                    placeholder="Add exclusions..."
                    multiple
                    allowNew
                    selected={repository.exclude}
                    onChange={(selected) => {
                      selected = selected.map((s: any) =>
                        typeof s === "string" ? s : s.label
                      );
                      (repository.exclude as any).replace(selected);
                    }}
                    options={state.excludes}
                    positionFixed
                  />
                </td>
                <td className="align-middle text-right">
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      color="link"
                      className="text-decoration-none"
                    >
                      <i className="fa fa-gear"></i>
                      <i className="fa fa-angle-down ml-2"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        onClick={() => {
                          state.config.repositories.splice(
                            state.config.repositories.indexOf(repository),
                            1
                          );
                        }}
                      >
                        <i className="fa fa-fw fa-trash mr-2"></i>
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </td>
              </>
            )}
          />
        )}
      </Accordion>
    );
  }
);

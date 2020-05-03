import React from "react";
import Toggle from "react-toggle";
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
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "~/components";
import { ConfigurationState } from "./ConfigurationState";
import {
  ConfigurationTable,
  ConfigurationTableProps,
} from "./ConfigurationTable";

const ConfigurationTableTeams = ConfigurationTable as React.FC<
  ConfigurationTableProps<ConfigurationState["config"]["teams"][0]>
>;

export const ConfigurationTeams = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion className="mb-3" initialOpen>
        <AccordionHeader className="h6 cursor-pointer">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              Teams
              <span className="small ml-1 text-muted">#1.01</span>
            </div>
            <Button
              outline
              size="sm"
              className="ml-auto align-self-end"
              onClick={(e) => {
                e.stopPropagation();
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
            </Button>
          </div>
        </AccordionHeader>
        <AccordionBody className="p-0">
          {!state.config || state.isLoadingDelay ? (
            <List className="m-4" height="200px" width="100%" />
          ) : (
            <ConfigurationTableTeams
              items={state.config.teams}
              header={
                <>
                  <th className="bt-0">Name</th>
                  <th className="bt-0">Inverted</th>
                  <th className="bt-0">Users</th>
                  <th className="text-right bt-0">Actions</th>
                </>
              }
              render={(team) => (
                <>
                  <td className="align-middle">
                    <Input
                      type="text"
                      onChange={(e) => {
                        team.name = e.currentTarget.value;
                      }}
                      value={team.name}
                      placeholder="Name (Required & Unique)..."
                    />
                  </td>
                  <td className="align-middle">
                    <Toggle
                      checked={team.invert}
                      onChange={() => {
                        team.invert = !team.invert;
                        if (team.invert) {
                          (team.users as any).replace([]);
                        }
                      }}
                    />
                  </td>
                  <td
                    className="align-middle"
                    style={{
                      maxWidth: "300px",
                      overflow: "hidden",
                    }}
                  >
                    {!team.invert && (
                      <Typeahead
                        id="exclusions"
                        placeholder="Add users..."
                        multiple
                        allowNew
                        selected={team.users}
                        onChange={(selected) => {
                          selected = selected.map((s: any) =>
                            typeof s === "string" ? s : s.label
                          );
                          (team.users as any).replace(selected);
                        }}
                        options={state.users}
                        positionFixed
                      />
                    )}
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
                            state.config.teams.splice(
                              state.config.teams.indexOf(team),
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
              renderAdditional={(team, style) => (
                <tr style={{ ...style }}>
                  <td colSpan={5}>
                    <Typeahead
                      id="exclusions"
                      placeholder="Add repositories..."
                      multiple
                      allowNew
                      selected={team.repositories}
                      onChange={(selected) => {
                        selected = selected.map((s: any) =>
                          typeof s === "string" ? s : s.label
                        );
                        (team.repositories as any).replace(selected);
                      }}
                      options={state.repositories}
                      positionFixed
                    />
                  </td>
                </tr>
              )}
            />
          )}
        </AccordionBody>
      </Accordion>
    );
  }
);

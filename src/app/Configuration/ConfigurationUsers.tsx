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
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "~/components";
import { ConfigurationState } from "./ConfigurationState";
import {
  ConfigurationTable,
  ConfigurationTableProps,
} from "./ConfigurationTable";

const ConfigurationTableUsers = ConfigurationTable as React.FC<
  ConfigurationTableProps<ConfigurationState["config"]["users"][0]>
>;

export const ConfigurationUsers = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion className="mb-3">
        <AccordionHeader className="h6 cursor-pointer">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              Users
              <span className="small ml-1 text-muted">#1.03</span>
            </div>
            <Button
              outline
              size="sm"
              className="ml-auto align-self-end"
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
            </Button>
          </div>
        </AccordionHeader>
        <AccordionBody className="p-0">
          {!state.config || state.isLoadingDelay ? (
            <List className="m-4" height="200px" width="100%" />
          ) : (
            <ConfigurationTableUsers
              items={state.config.users}
              header={
                <>
                  <th className="bt-0">Name</th>
                  <th className="bt-0">Associations</th>
                  <th className="text-right bt-0">Actions</th>
                </>
              }
              render={(user) => (
                <>
                  <td className="align-middle">
                    <Input
                      type="text"
                      onChange={(e) => {
                        user.name = e.currentTarget.value;
                      }}
                      value={user.name}
                      placeholder="Name (Required & Unique)..."
                    />
                  </td>
                  <td
                    className="align-middle"
                    style={{ maxWidth: "300px", overflow: "hidden" }}
                  >
                    <Typeahead
                      id="exclusions"
                      placeholder="Add associations..."
                      multiple
                      allowNew
                      selected={user.associations as any}
                      onChange={(selected) => {
                        selected = selected.map((s: any) =>
                          typeof s === "string" ? s : s.label
                        );
                        (user.associations as any).replace(selected);
                      }}
                      options={state.associations}
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
                            state.config.users.splice(
                              state.config.users.indexOf(user),
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
        </AccordionBody>
      </Accordion>
    );
  }
);

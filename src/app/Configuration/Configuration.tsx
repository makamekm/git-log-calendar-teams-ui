import React from "react";
import { toJS } from "mobx";
import Toggle from "react-toggle";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";
import { Typeahead } from "react-bootstrap-typeahead";

import {
  Container,
  Row,
  Col,
  Table,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Input,
  DropdownMenu,
  Form,
  FormGroup,
  Label,
  Accordion,
  AccordionHeader,
  AccordionBody,
  WithLayoutMeta,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { Config } from "~/shared/Config";
import { useIsDirty, useDelay, useOnLoad } from "~/hooks";

interface SettingsState {
  isDirty: boolean;
  config: Config;
  isLoading: boolean;
  isLoadingDelay: boolean;
  excludes: string[];
  users: string[];
  allUsers: {
    userKey: string;
    user?: {
      name: string;
    };
    email: string;
    name: string;
    value: number;
  }[];
  usedAssociations: string[];
  associations: string[];
  load: () => Promise<void>;
  save: () => Promise<void>;
}

const SettingsForm = observer(({ state }: { state: SettingsState }) => {
  return (
    <Accordion className="mb-3">
      <AccordionHeader className="h6 cursor-pointer">
        Preferences
        <span className="small ml-1 text-muted">#1.00</span>
      </AccordionHeader>
      <AccordionBody className="pb-0">
        {!state.config || state.isLoadingDelay ? (
          <List height="200px" width="100%" />
        ) : (
          <Form className="mt-3 mb-3">
            <FormGroup row>
              <Label sm={4}>Password</Label>
              <Col sm={8}>
                <Input
                  type="password"
                  onChange={(e) => {
                    state.config.password = e.currentTarget.value;
                  }}
                  value={state.config.password}
                  placeholder="Enter Password..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Default Branch</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => {
                    state.config.branch = e.currentTarget.value;
                  }}
                  value={state.config.branch}
                  placeholder="Enter Default Branch..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Collect Function</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => {
                    state.config.evaluateStr = e.currentTarget.value;
                  }}
                  value={String(state.config.evaluateStr)}
                  placeholder="Enter JS function..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Collect Interval</Label>
              <Col sm={8}>
                <Input
                  type="number"
                  onChange={(e) => {
                    state.config.collectInterval = Number(
                      e.currentTarget.value
                    );
                  }}
                  value={state.config.collectInterval}
                  placeholder="Enter Minutes..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Only Registered Users</Label>
              <Col sm={8}>
                <Toggle
                  checked={state.config.onlyRegistered}
                  onChange={() => {
                    state.config.onlyRegistered = !state.config.onlyRegistered;
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Collect Messages</Label>
              <Col sm={8}>
                <Toggle
                  checked={state.config.collectMessages}
                  onChange={() => {
                    state.config.collectMessages = !state.config
                      .collectMessages;
                  }}
                />
              </Col>
            </FormGroup>
          </Form>
        )}
      </AccordionBody>
    </Accordion>
  );
});

const SettingsRepositories = observer(({ state }: { state: SettingsState }) => {
  return (
    <Accordion className="mb-3" initialOpen>
      <AccordionHeader className="h6 cursor-pointer">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            Repositories
            <span className="small ml-1 text-muted">#1.01</span>
          </div>
          <Button
            outline
            size="sm"
            className="ml-auto align-self-end"
            onClick={(e) => {
              e.stopPropagation();
              state.config.repositories.unshift({
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
      </AccordionHeader>
      <AccordionBody className="p-0">
        {!state.config || state.isLoadingDelay ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <Table striped className="mb-0" style={{ maxWidth: "100%" }}>
            <thead>
              <tr>
                <th className="bt-0">#</th>
                <th className="bt-0">Name</th>
                <th className="bt-0">Url</th>
                <th className="bt-0">Branch</th>
                <th className="bt-0">Excludes</th>
                <th className="text-right bt-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.config.repositories.map((repository, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}.</td>
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
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </AccordionBody>
    </Accordion>
  );
});

const SettingsTeams = observer(({ state }: { state: SettingsState }) => {
  return (
    <Accordion className="mb-3" initialOpen>
      <AccordionHeader className="h6 cursor-pointer">
        <div className="d-flex justify-content-center align-items-center">
          <div>
            Teams
            <span className="small ml-1 text-muted">#1.02</span>
          </div>
          <Button
            outline
            size="sm"
            className="ml-auto align-self-end"
            onClick={(e) => {
              e.stopPropagation();
              state.config.teams.unshift({
                name: "",
                invert: false,
                users: [],
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
          <Table striped className="mb-0" style={{ maxWidth: "100%" }}>
            <thead>
              <tr>
                <th className="bt-0">#</th>
                <th className="bt-0">Name</th>
                <th className="bt-0">Inverted</th>
                <th className="bt-0">Users</th>
                <th className="text-right bt-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.config.teams.map((team, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}.</td>
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
                      style={{ maxWidth: "300px", overflow: "hidden" }}
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
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </AccordionBody>
    </Accordion>
  );
});

const SettingsUsers = observer(({ state }: { state: SettingsState }) => {
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
          <Table striped className="mb-0" style={{ maxWidth: "100%" }}>
            <thead>
              <tr>
                <th className="bt-0">#</th>
                <th className="bt-0">Name</th>
                <th className="bt-0">Associations</th>
                <th className="text-right bt-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.config.users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}.</td>
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
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </AccordionBody>
    </Accordion>
  );
});

export const Configuration = observer(() => {
  const state = useLocalStore<SettingsState>(() => ({
    isDirty: false,
    config: null,
    isLoading: false,
    isLoadingDelay: false,
    allUsers: [],
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
  useDelay(state, "isLoading", "isLoadingDelay");

  return (
    <Container>
      <WithLayoutMeta
        meta={{
          pageTitle: "Configuration",
          breadcrumbs: [
            {
              name: "Configuration",
            },
          ],
        }}
      />
      <Row className="mb-2">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-4 pb-2">
            <HeaderMain title="Configuration" className="mt-0 mb-3" />
            <ButtonToolbar className="ml-auto">
              <ButtonGroup className="align-self-start mt-0 mb-3">
                <Button
                  disabled={!state.isDirty}
                  color="primary"
                  className="mb-2 mr-2 px-3"
                  onClick={state.save}
                >
                  Apply
                </Button>
              </ButtonGroup>
              <ButtonGroup className="mt-0 mb-3">
                <Button
                  color="link"
                  className="mb-2 align-self-start"
                  onClick={state.load}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </Col>
      </Row>

      <SettingsForm state={state} />
      <SettingsRepositories state={state} />
      <SettingsTeams state={state} />
      <SettingsUsers state={state} />
    </Container>
  );
});

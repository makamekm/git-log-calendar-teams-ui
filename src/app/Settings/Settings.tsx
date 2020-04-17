import React from "react";
import { autorun, toJS } from "mobx";
import Toggle from "react-toggle";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";
import { Typeahead } from "react-bootstrap-typeahead";
import { debounce } from "underscore";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Input,
  DropdownMenu,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { Config } from "~/shared/Config";

interface SettingsState {
  isDirty: boolean;
  config: Config;
  isLoading: boolean;
  isLoadingDelay: boolean;
  excludes: string[];
  users: string[];
  associations: string[];
  load: () => Promise<void>;
  save: () => Promise<void>;
}

const SettingsRepositories = observer(({ state }: { state: SettingsState }) => {
  return (
    <Row>
      <Col lg={12}>
        <Card className="mb-3">
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                Repositories
                <span className="small ml-1 text-muted">#1.01</span>
              </CardTitle>
              <Button
                outline
                size="sm"
                className="ml-auto"
                onClick={() => {
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
          </CardBody>
          {state.isLoadingDelay ? (
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
                {state.config &&
                  state.config.repositories.map((repository, index) => {
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
                            placeholder="Url..."
                          />
                        </td>
                        <td className="align-middle">
                          <Input
                            type="text"
                            onChange={(e) => {
                              repository.url = e.currentTarget.value;
                            }}
                            value={repository.url}
                            placeholder="Url..."
                          />
                        </td>
                        <td className="align-middle">
                          <Input
                            type="text"
                            onChange={(e) => {
                              repository.branch = e.currentTarget.value;
                            }}
                            value={repository.branch}
                            placeholder="Branch..."
                          />
                        </td>
                        <td
                          className="align-middle"
                          style={{ maxWidth: "300px", overflow: "hidden" }}
                        >
                          <Typeahead
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
                                    state.config.repositories.indexOf(
                                      repository
                                    ),
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
        </Card>
      </Col>
    </Row>
  );
});

const SettingsTeams = observer(({ state }: { state: SettingsState }) => {
  return (
    <Row>
      <Col lg={12}>
        <Card className="mb-3">
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                Teams
                <span className="small ml-1 text-muted">#1.01</span>
              </CardTitle>
              <Button
                outline
                size="sm"
                className="ml-auto"
                onClick={() => {
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
          </CardBody>
          {state.isLoadingDelay ? (
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
                {state.config &&
                  state.config.teams.map((team, index) => {
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
                            placeholder="Url..."
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
        </Card>
      </Col>
    </Row>
  );
});

const SettingsUsers = observer(({ state }: { state: SettingsState }) => {
  return (
    <Row>
      <Col lg={12}>
        <Card className="mb-3">
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                Users
                <span className="small ml-1 text-muted">#1.01</span>
              </CardTitle>
              <Button
                outline
                size="sm"
                className="ml-auto"
                onClick={() => {
                  state.config.users.unshift({
                    name: "",
                    associations: [],
                  });
                }}
              >
                <i className="fa fa-plus mr-2"></i>Add
              </Button>
            </div>
          </CardBody>
          {state.isLoadingDelay ? (
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
                {state.config &&
                  state.config.users.map((user, index) => {
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
                            placeholder="Url..."
                          />
                        </td>
                        <td
                          className="align-middle"
                          style={{ maxWidth: "300px", overflow: "hidden" }}
                        >
                          <Typeahead
                            placeholder="Add associations..."
                            multiple
                            allowNew
                            selected={user.associations}
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
        </Card>
      </Col>
    </Row>
  );
});

const useIsDirty: <T extends {
  isDirty?: boolean;
}>(
  state: T,
  name: keyof T
) => void = (state, name) => {
  React.useEffect(() => {
    let json: string = null;
    return autorun(() => {
      const newJson = JSON.stringify(state[name]);
      if (json != null && json !== newJson) {
        state.isDirty = true;
      }
      json = newJson;
    });
  }, [state, name]);
};

const useDelay: <T>(state: T, name: keyof T, newName: keyof T) => void = (
  state,
  name,
  newName,
  delay = 500
) => {
  React.useEffect(() => {
    const setValue = debounce((value) => (state[newName] = value), delay);
    return autorun(() => {
      setValue(state[name]);
    });
  }, [state, name, newName, delay]);
};

export const Settings = observer(() => {
  const state = useLocalStore<SettingsState>(() => ({
    isDirty: false,
    configModel: null,
    config: null,
    isLoading: false,
    isLoadingDelay: false,
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
    get associations() {
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
    load: async () => {
      state.isLoading = true;
      state.config = await ipc.handlers.GET_CONFIG(true);
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
      state.isDirty = false;
      state.isLoading = false;
    },
  }));

  React.useEffect(() => {
    state.load();
  }, [state]);

  useIsDirty(state, "config");
  useDelay(state, "isLoading", "isLoadingDelay");

  return (
    <Container>
      <Row className="mb-2">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-4 pb-2">
            <HeaderMain title="Settings" className="mt-0 mb-3" />
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

      <SettingsRepositories state={state} />
      <SettingsTeams state={state} />
      <SettingsUsers state={state} />
    </Container>
  );
});

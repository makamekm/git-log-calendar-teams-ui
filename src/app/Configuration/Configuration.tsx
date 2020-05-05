import React from "react";
import { toJS } from "mobx";
import { useLocalStore, observer } from "mobx-react";

import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  WithLayoutMeta,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useIsDirty, useDelay, useOnLoad } from "~/hooks";
import { ConfigurationState } from "./ConfigurationState";
import { ConfigurationTeams } from "./ConfigurationTeams";
import { ConfigurationUsers } from "./ConfigurationUsers";
import { ConfigurationRepositories } from "./ConfigurationRepositories";
import { ConfigurationForm } from "./ConfigurationForm";
import { ConfigurationAllUsers } from "./ConfigurationAllUsers";

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

  return (
    <Container className="pb-4">
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

      <ConfigurationForm state={state} />
      <ConfigurationTeams state={state} />
      <ConfigurationRepositories state={state} />
      <ConfigurationUsers state={state} />
      <ConfigurationAllUsers state={state} />
    </Container>
  );
});

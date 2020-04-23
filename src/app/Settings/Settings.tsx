import React from "react";
import { toJS } from "mobx";
import Toggle from "react-toggle";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";

import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  Input,
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
import { useIsDirty, useDelay, useOnLoad } from "~/hooks";

interface SettingsState {
  isDirty: boolean;
  config: {
    publicKey: string;
    secretKey: string;
    useDriveSwarm: boolean;
  };
  isLoading: boolean;
  isLoadingDelay: boolean;
  load: () => Promise<void>;
  save: () => Promise<void>;
  empty: () => Promise<void>;
}

const SettingsForm = observer(({ state }: { state: SettingsState }) => {
  return (
    <Accordion className="mb-3" initialOpen>
      <AccordionHeader className="h6 cursor-pointer">
        Application Preferences
      </AccordionHeader>
      <AccordionBody className="pb-0">
        {!state.config || state.isLoadingDelay ? (
          <List height="200px" width="100%" />
        ) : (
          <Form className="mt-3 mb-3">
            <FormGroup row>
              <Label sm={4}>Public Key</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => {
                    state.config.publicKey = e.currentTarget.value;
                  }}
                  value={state.config.publicKey}
                  placeholder="Enter Public Key..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Secret Key</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => {
                    state.config.secretKey = e.currentTarget.value;
                  }}
                  value={state.config.secretKey}
                  placeholder="Enter Secret Key..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Use Swarm</Label>
              <Col sm={8}>
                <Toggle
                  checked={state.config.useDriveSwarm}
                  onChange={() => {
                    state.config.useDriveSwarm = !state.config.useDriveSwarm;
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Remount Drive & Reload All</Label>
              <Col sm={8}>
                <ButtonGroup className="align-self-start mt-0 mb-3">
                  <Button
                    disabled={state.isDirty}
                    color="danger"
                    className="mb-2 mr-2 px-3"
                    onClick={state.save}
                  >
                    Remount Drive
                  </Button>
                </ButtonGroup>
                <ButtonGroup className="align-self-start mt-0 mb-3">
                  <Button
                    disabled={state.isDirty}
                    color="danger"
                    className="mb-2 mr-2 px-3"
                    onClick={state.empty}
                  >
                    Empty Drive
                  </Button>
                </ButtonGroup>
              </Col>
            </FormGroup>
          </Form>
        )}
      </AccordionBody>
    </Accordion>
  );
});

export const Settings = observer(() => {
  const state = useLocalStore<SettingsState>(() => ({
    isDirty: false,
    config: null,
    isLoading: false,
    isLoadingDelay: false,
    load: async () => {
      state.isLoading = true;
      state.config = await ipc.handlers.GET_DRIVE_CONFIG();
      state.isDirty = false;
      state.isLoading = false;
    },
    save: async () => {
      state.isLoading = true;
      await ipc.handlers.SAVE_DRIVE_CONFIG(toJS(state.config));
      state.config = await ipc.handlers.GET_DRIVE_CONFIG();
      state.isDirty = false;
      state.isLoading = false;
    },
    empty: async () => {
      state.isLoading = true;
      await ipc.handlers.EMPTY_DRIVE_CONFIG();
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
          pageTitle: "Settings",
          breadcrumbs: [
            {
              name: "Settings",
            },
          ],
        }}
      />
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

      <SettingsForm state={state} />
    </Container>
  );
});

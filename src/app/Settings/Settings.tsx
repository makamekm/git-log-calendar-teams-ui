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
  ButtonToolbar,
  ButtonGroup,
  Button,
  Input,
  FormGroup,
  Label,
  Accordion,
  AccordionHeader,
  AccordionBody,
  WithLayoutMeta,
  UncontrolledModal,
  ModalBody,
  UncontrolledModalClose,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useIsDirty, useOnLoad } from "~/hooks";
import { ApplicationSettings } from "~/shared/Settings";
import { generateDriveKeys } from "~/tools";
import { Config } from "~/shared/Config";

interface SettingsState {
  isDirty: boolean;
  settings: ApplicationSettings;
  config: Config;
  isLoading: boolean;
  repositories: string[];
  load: () => Promise<void>;
  save: () => Promise<void>;
  remount: () => Promise<void>;
  empty: () => Promise<void>;
  regnerateKeyPair: () => void;
}

const SettingsForm = observer(({ state }: { state: SettingsState }) => {
  return (
    <Accordion className="mb-3" initialOpen>
      <AccordionHeader className="h6 cursor-pointer">
        Application Preferences
      </AccordionHeader>
      <AccordionBody className="pb-0">
        {!state.settings || state.isLoading ? (
          <List className="m-3" height="200px" width="100%" />
        ) : (
          <div className="form mt-3 mb-3">
            <FormGroup row>
              <Label sm={4}>Public Key</Label>
              <Col sm={8}>
                <Input
                  type="text"
                  onChange={(e) => {
                    state.settings.publicKey = e.currentTarget.value;
                  }}
                  value={state.settings.publicKey}
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
                    state.settings.secretKey = e.currentTarget.value;
                  }}
                  value={state.settings.secretKey}
                  placeholder="Enter Secret Key..."
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Regenerate Key Pair</Label>
              <Col sm={8}>
                <ButtonGroup className="align-self-start mt-0">
                  <Button color="info" onClick={state.regnerateKeyPair}>
                    Regenerate The Key Pair
                  </Button>
                </ButtonGroup>
              </Col>
            </FormGroup>
            {!!state.settings.secretKey && (
              <FormGroup row>
                <Label sm={4}>Don't Collect Statistics</Label>
                <Col sm={8}>
                  <Toggle
                    checked={state.settings.dontCollect}
                    onChange={() => {
                      state.settings.dontCollect = !state.settings.dontCollect;
                    }}
                  />
                </Col>
              </FormGroup>
            )}
            {!state.settings.dontCollect && (
              <FormGroup row>
                <Label sm={4}>Parallel Job Collecting Limit</Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    onChange={(e) => {
                      state.settings.parallelCollectLimit = Math.max(
                        Number(e.currentTarget.value),
                        1
                      );
                    }}
                    value={Math.max(state.settings.parallelCollectLimit, 1)}
                    placeholder="Enter Number..."
                  />
                </Col>
              </FormGroup>
            )}
            {!state.settings.dontCollect && (
              <FormGroup row>
                <Label sm={4}>
                  Local Collecting Interval (0 is from Configuration) [Minutes]
                </Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    onChange={(e) => {
                      state.settings.forceCollectingInterval = Math.max(
                        Number(e.currentTarget.value),
                        0
                      );
                    }}
                    value={Math.max(state.settings.forceCollectingInterval, 0)}
                    placeholder="Enter Number..."
                  />
                </Col>
              </FormGroup>
            )}
            {!state.settings.dontCollect && (
              <FormGroup row>
                <Label sm={4}>
                  Limit Repositories Per Try (0 is unlimited)
                </Label>
                <Col sm={8}>
                  <Input
                    type="number"
                    onChange={(e) => {
                      state.settings.limitCollectRepositoriesPerTry = Math.max(
                        Number(e.currentTarget.value),
                        0
                      );
                    }}
                    value={Math.max(
                      state.settings.limitCollectRepositoriesPerTry,
                      0
                    )}
                    placeholder="Enter Number..."
                  />
                </Col>
              </FormGroup>
            )}
            {!state.settings.dontCollect && (
              <FormGroup row>
                <Label sm={4}>
                  Repositories to Collect (If empty then collect from all)
                </Label>
                <Col sm={8}>
                  <Typeahead
                    id="exclusions"
                    placeholder="Add repositories..."
                    multiple
                    allowNew
                    selected={state.settings.repositoryNamesToCollect || []}
                    onChange={(selected) => {
                      selected = selected.map((s: any) =>
                        typeof s === "string" ? s : s.label
                      );
                      (state.settings.repositoryNamesToCollect as any).replace(
                        selected
                      );
                    }}
                    options={state.repositories}
                    positionFixed
                  />
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label sm={4}>Use Swarm</Label>
              <Col sm={8}>
                <Toggle
                  checked={state.settings.useDriveSwarm}
                  onChange={() => {
                    state.settings.useDriveSwarm = !state.settings
                      .useDriveSwarm;
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Remount Drive & Reload All</Label>
              <Col sm={8}>
                <ButtonGroup className="align-self-start mt-0">
                  <Button
                    id="remountDriveModal"
                    disabled={state.isDirty}
                    color="danger"
                  >
                    Remount Drive
                  </Button>
                  <Button
                    id="emptyDriveModal"
                    disabled={state.isDirty}
                    color="danger"
                  >
                    Empty Drive
                  </Button>
                </ButtonGroup>
                <UncontrolledModal
                  target="remountDriveModal"
                  className="modal-danger"
                >
                  <ModalBody className="table-danger text-center px-5 py-5">
                    <i className="fas fa-exclamation-triangle fa-4x modal-icon mb-4"></i>
                    <h6>Remount Drive</h6>
                    <p className="modal-text mb-5">
                      This operation is irreversible, please accept it.
                    </p>
                    <UncontrolledModalClose
                      color="danger"
                      className="mr-2"
                      onClick={state.remount}
                    >
                      OK, Process
                    </UncontrolledModalClose>
                    <UncontrolledModalClose
                      color="link"
                      className="text-danger"
                    >
                      Cancel
                    </UncontrolledModalClose>
                  </ModalBody>
                </UncontrolledModal>
                <UncontrolledModal
                  target="emptyDriveModal"
                  className="modal-danger"
                >
                  <ModalBody className="table-danger text-center px-5 py-5">
                    <i className="fas fa-exclamation-triangle fa-4x modal-icon mb-4"></i>
                    <h6>Empty Drive</h6>
                    <p className="modal-text mb-5">
                      This operation is irreversible, please accept it.
                    </p>
                    <UncontrolledModalClose
                      color="danger"
                      className="mr-2"
                      onClick={state.empty}
                    >
                      OK, Process
                    </UncontrolledModalClose>
                    <UncontrolledModalClose
                      color="link"
                      className="text-danger"
                    >
                      Cancel
                    </UncontrolledModalClose>
                  </ModalBody>
                </UncontrolledModal>
              </Col>
            </FormGroup>
          </div>
        )}
      </AccordionBody>
    </Accordion>
  );
});

export const Settings = observer(() => {
  const state = useLocalStore<SettingsState>(() => ({
    isDirty: false,
    config: null,
    settings: null,
    isLoading: false,
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
    load: async () => {
      state.isLoading = true;
      state.settings = await ipc.handlers.GET_SETTINGS();
      state.config = await ipc.handlers.GET_CONFIG(true);
      state.isDirty = false;
      state.isLoading = false;
    },
    save: async () => {
      state.isLoading = true;
      await ipc.handlers.SAVE_SETTINGS(toJS(state.settings));
      state.settings = await ipc.handlers.GET_SETTINGS();
      state.config = await ipc.handlers.GET_CONFIG(true);
      state.isDirty = false;
      state.isLoading = false;
    },
    remount: async () => {
      state.isLoading = true;
      await ipc.handlers.REMOUNT_DRIVE();
      state.config = await ipc.handlers.GET_CONFIG(true);
      state.isLoading = false;
    },
    empty: async () => {
      state.isLoading = true;
      await ipc.handlers.EMPTY_DRIVE();
      state.config = await ipc.handlers.GET_CONFIG(true);
      state.isLoading = false;
    },
    regnerateKeyPair: () => {
      const keyPair = generateDriveKeys();
      state.settings.publicKey = keyPair.publicKey;
      state.settings.secretKey = keyPair.secretKey;
    },
  }));

  useOnLoad(state.load);
  useIsDirty(state, "settings");

  return (
    <Container className="pb-4">
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

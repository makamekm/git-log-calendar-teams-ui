import React from "react";
import classNames from "classnames";
import { toJS } from "mobx";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";

import { HeaderMain } from "~/components/Blocks/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useIsDirty, useOnLoad } from "~/hooks";
import { ApplicationSettings } from "~/shared/Settings";
import { generateDriveKeys } from "~/tools";
import { Config } from "~/shared/Config";
import { useLayoutConfig } from "~/components/Layout/LayoutService";
import { Accordion } from "~/components/Accordion/Accordion";
import { AccordionToggle } from "~/components/Accordion/AccordionToggle";
import { Typeahead } from "~/components/Typeahead/Typeahead";
import { Toggle } from "~/components/Toggle/Toggle";
import { AlertModal } from "~/components/Modal/AlertModal";

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
    <Accordion className="mb-3" initialOpen title={"Application Preferences"}>
      {!state.settings || state.isLoading ? (
        <List className="m-3" height="200px" width="100%" />
      ) : (
        <div className="px-3 pb-3 -mt-2">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Open Window on Start:
            </div>
            <div className="flex-1 mt-3 mx-2">
              <Toggle
                checked={!!state.settings.openWindowOnStart}
                onChange={() => {
                  state.settings.openWindowOnStart = !state.settings
                    .openWindowOnStart;
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Start Web Server:
            </div>
            <div className="flex-1 mt-3 mx-2">
              <Toggle
                checked={!!state.settings.useWebServer}
                onChange={() => {
                  state.settings.useWebServer = !state.settings.useWebServer;
                }}
              />
            </div>
          </div>
          <AccordionToggle value={!!state.settings.useWebServer}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Web Server Hostname:
              </div>
              <div className="flex-1 mt-3 mx-2">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.settings.webHostname = e.currentTarget.value;
                  }}
                  value={state.settings.webHostname || "0.0.0.0"}
                  placeholder="Enter Hostname..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Web Server Port:
              </div>
              <div className="flex-1 mt-3 mx-2">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="number"
                  onChange={(e) => {
                    state.settings.webPort = Number(e.currentTarget.value) || 0;
                  }}
                  value={state.settings.webPort || 8080}
                  placeholder="Enter Port..."
                />
              </div>
            </div>
          </AccordionToggle>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Public Key:
            </div>
            <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
              <input
                autoComplete={"off"}
                className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                type="text"
                onChange={(e) => {
                  state.settings.publicKey = e.currentTarget.value;
                }}
                value={state.settings.publicKey}
                placeholder="Enter Public Key..."
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Secret Key:
            </div>
            <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
              <input
                autoComplete={"off"}
                className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  state.settings.secretKey = e.currentTarget.value;
                }}
                value={state.settings.secretKey}
                placeholder="Enter Secret Key..."
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Regenerate Key Pair:
            </div>
            <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
              <button
                className="text-base font-normal py-2 px-3 rounded-lg border dark-mode:border-gray-500 text-gray-700 dark-mode:text-gray-300 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={state.regnerateKeyPair}
              >
                Regenerate Key Pair
              </button>
            </div>
          </div>
          <AccordionToggle value={!!state.settings.secretKey}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Don't Collect Statistics:
              </div>
              <div className="flex-1 mt-3 mx-2">
                <Toggle
                  checked={!!state.settings.dontCollect}
                  onChange={(value) => {
                    state.settings.dontCollect = value;
                  }}
                />
              </div>
            </div>
          </AccordionToggle>
          <AccordionToggle value={!state.settings.dontCollect}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Parallel Job Collecting Limit:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="number"
                  onChange={(e) => {
                    state.settings.parallelCollectingJobLimit = Math.max(
                      Number(e.currentTarget.value),
                      1
                    );
                  }}
                  value={Math.max(state.settings.parallelCollectingJobLimit, 1)}
                  placeholder="Enter Number..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Local Collecting Interval (0 is from Configuration) [Minutes]:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
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
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Limit Repositories Per Try (0 is unlimited):
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="number"
                  onChange={(e) => {
                    state.settings.limitCollectingRepositoriesPerTry = Math.max(
                      Number(e.currentTarget.value),
                      0
                    );
                  }}
                  value={Math.max(
                    state.settings.limitCollectingRepositoriesPerTry,
                    0
                  )}
                  placeholder="Enter Number..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                Repositories to Collect (If empty then collect from all):
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <Typeahead
                  placeholder="Add repositories..."
                  autoFocus
                  multiple
                  allowNew
                  selected={state.settings.collectingRepositoryNames || []}
                  onChange={(selected) => {
                    (state.settings.collectingRepositoryNames as any).replace(
                      selected
                    );
                  }}
                  options={state.repositories}
                />
              </div>
            </div>
          </AccordionToggle>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Use Swarm:
            </div>
            <div className="flex-1 mt-3 mx-2">
              <Toggle
                checked={!!state.settings.useDriveSwarm}
                onChange={() => {
                  state.settings.useDriveSwarm = !state.settings.useDriveSwarm;
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Use S3:
            </div>
            <div className="flex-1 mt-3 mx-2">
              <Toggle
                checked={!!state.settings.useDriveS3}
                onChange={(value) => {
                  state.settings.useDriveS3 = value;
                }}
              />
            </div>
          </div>
          <AccordionToggle value={!!state.settings.useDriveS3}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                S3 Access Key ID:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.settings.s3AccessKeyId = e.currentTarget.value;
                  }}
                  value={state.settings.s3AccessKeyId}
                  placeholder="Enter S3 Access Key ID..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                S3 Secret Access Key:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.settings.s3SecretAccessKey = e.currentTarget.value;
                  }}
                  value={state.settings.s3SecretAccessKey}
                  placeholder="Enter S3 Secret Access Key..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                S3 Bucket Name:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.settings.s3Bucket = e.currentTarget.value;
                  }}
                  value={state.settings.s3Bucket}
                  placeholder="Enter S3 Bucket Name..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 md:text-right pt-2 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
                S3 Drive Path:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.settings.s3DrivePath = e.currentTarget.value;
                  }}
                  value={state.settings.s3DrivePath}
                  placeholder="Enter S3 Drive Path..."
                />
              </div>
            </div>
          </AccordionToggle>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 md:text-right pt-1 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300">
              Drive Actions:
            </div>
            <div className="flex-1 mt-1 -mb-2 flex flex-row flex-wrap">
              <AlertModal
                accept={state.remount}
                title="Remount Drive"
                text="This operation is irreversible, please accept it."
              >
                {({ open }) => (
                  <button
                    className={classNames(
                      "text-base font-semibold py-2 px-3 m-2 rounded-lg bg-red-600 active:bg-red-700 text-white hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                      {
                        "pointer-events-none opacity-50": state.isDirty,
                      }
                    )}
                    disabled={state.isDirty}
                    color="danger"
                    onClick={open}
                  >
                    Remount Drive
                  </button>
                )}
              </AlertModal>
              <AlertModal
                accept={state.empty}
                title="Empty Drive"
                text="This operation is irreversible, please accept it."
              >
                {({ open }) => (
                  <button
                    className={classNames(
                      "text-base font-semibold py-2 px-3 m-2 rounded-lg bg-red-600 active:bg-red-700 text-white hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                      {
                        "pointer-events-none opacity-50": state.isDirty,
                      }
                    )}
                    disabled={state.isDirty}
                    color="danger"
                    onClick={open}
                  >
                    Empty Drive
                  </button>
                )}
              </AlertModal>
            </div>
          </div>
        </div>
      )}
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
  useLayoutConfig({
    pageTitle: "Settings",
    breadcrumbs: [
      {
        name: "Settings",
      },
    ],
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-4 md:pb-4">
        <HeaderMain title="Settings" />
        <div className="ml-auto my-3">
          <button
            className={classNames(
              "text-base font-semibold py-2 px-3 mx-2 rounded-lg bg-blue-500 active:bg-blue-700 text-white hover:text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline",
              {
                "pointer-events-none opacity-50":
                  !state.isDirty || state.isLoading,
              }
            )}
            disabled={!state.isDirty || state.isLoading}
            onClick={state.save}
          >
            Apply
          </button>
          <button
            className={classNames(
              "text-base font-normal py-2 px-3 mx-2 rounded-lg border dark-mode:border-gray-500 text-gray-700 dark-mode:text-gray-300 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            )}
            onClick={state.load}
          >
            Reset
          </button>
        </div>
      </div>

      <SettingsForm state={state} />
    </>
  );
});

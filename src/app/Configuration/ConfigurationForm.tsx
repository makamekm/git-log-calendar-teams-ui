import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import { ConfigurationState } from "./ConfigurationState";
import { Accordion } from "~/components/Accordion/Accordion";
import { Toggle } from "~/components/Toggle/Toggle";

export const ConfigurationForm = observer(
  ({ state }: { state: ConfigurationState }) => {
    return (
      <Accordion
        className="mb-3"
        syncStorageName="configurationFormAccordion"
        title={
          <div className="flex justify-between items-center w-full">
            <div>
              Preferences
              <span className="text-sm ml-2 text-gray-600">#1.00</span>
            </div>
          </div>
        }
      >
        {!state.config || state.isLoading ? (
          <List className="m-3" height="200px" width="100%" />
        ) : (
          <div className="px-3 pb-3 -mt-2">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 mx-2 mt-3 pt-2 text-gray-800 dark-mode:text-gray-300 md:text-right">
                Password:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="password"
                  onChange={(e) => {
                    state.config.password = e.currentTarget.value;
                  }}
                  value={state.config.password || ""}
                  placeholder="Enter Password..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 mx-2 mt-3 pt-2 text-gray-800 dark-mode:text-gray-300 md:text-right">
                Default Branch:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.config.branch = e.currentTarget.value;
                  }}
                  value={state.config.branch || ""}
                  placeholder="Enter Default Branch..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 mx-2 mt-3 pt-2 text-gray-800 dark-mode:text-gray-300 md:text-right">
                Analyze Function [JavaScript]:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => {
                    state.config.evaluateStr = e.currentTarget.value;
                  }}
                  value={String(state.config.evaluateStr)}
                  placeholder="Enter JS function..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 mx-2 mt-3 pt-2 text-gray-800 dark-mode:text-gray-300 md:text-right">
                Collect Interval [Minutes]:
              </div>
              <div className="flex-1 mt-3 mx-2 flex flex-col md:flex-row">
                <input
                  autoComplete={"off"}
                  className="ellipsis w-full text-base shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800 leading-none focus:outline-none focus:shadow-outline"
                  type="number"
                  onChange={(e) => {
                    state.config.collectInterval = Number(
                      e.currentTarget.value
                    );
                  }}
                  value={state.config.collectInterval || ""}
                  placeholder="Enter Minutes..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300 md:text-right">
                Only Registered Users (Hide unregistered):
              </div>
              <div className="flex-1 mt-3 mx-2">
                <Toggle
                  checked={!!state.config.onlyRegistered}
                  onChange={() => {
                    state.config.onlyRegistered = !state.config.onlyRegistered;
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 mx-2 mt-3 text-gray-800 dark-mode:text-gray-300 md:text-right">
                Collect Messages (Messages will not be displayed):
              </div>
              <div className="flex-1 mt-3 mx-2">
                <Toggle
                  checked={state.config.collectMessages}
                  onChange={() => {
                    state.config.collectMessages = !state.config
                      .collectMessages;
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </Accordion>
    );
  }
);

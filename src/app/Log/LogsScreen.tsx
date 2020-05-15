import React from "react";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";
import moment from "moment";
import classNames from "classnames";

import { HeaderMain } from "~/components/Blocks/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useOnChange, useOnLoad } from "~/hooks";
import { useLayoutConfig } from "~/components/Layout/LayoutService";
import { Dropdown } from "~/components/Dropdown/Dropdown";

const matchLogReg = /\[(\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d)\] \[(\w*)\] ([\d\w\W]*)/m;

const levelColorMap = {
  warn: "yellow",
  error: "red",
  info: "cyan",
};

interface LogsState {
  search: string;
  limit: number;
  logs: {
    main: string[];
    renderer: string[];
  };
  aggregatedLogs: {
    source: string;
    date: moment.Moment;
    level: string;
    message: string;
  }[];
  isLoading: boolean;
  load: () => Promise<void>;
  clear: () => Promise<void>;
}

export const LogsScreen = observer(() => {
  const state = useLocalStore<LogsState>(() => ({
    search: "",
    limit: 50,
    logs: {
      main: [],
      renderer: [],
    },
    get aggregatedLogs() {
      const logs: {
        source: string;
        date: moment.Moment;
        level: string;
        message: string;
      }[] = [];
      state.logs.main.forEach((line) => {
        const match = matchLogReg.exec(line);
        if (match) {
          const date = moment(match[1]);
          const level = match[2];
          const message = match[3];
          logs.push({
            date,
            level,
            message,
            source: "main",
          });
        }
      });
      state.logs.renderer.forEach((line) => {
        const match = matchLogReg.exec(line);
        if (match) {
          const date = moment(match[1]);
          const level = match[2];
          const message = match[3];
          logs.push({
            date,
            level,
            message,
            source: "renderer",
          });
        }
      });
      return logs.sort((a, b) => +b.date - +a.date);
    },
    isLoading: false,
    load: async () => {
      state.isLoading = true;
      state.logs = await ipc.handlers.GET_LOGS(state.search, state.limit);
      state.isLoading = false;
    },
    clear: async () => {
      state.isLoading = true;
      await ipc.handlers.CLEAR_LOGS();
      state.logs = await ipc.handlers.GET_LOGS(state.search, state.limit);
      state.isLoading = false;
    },
  }));

  useOnLoad(state.load);
  useOnChange(state, "search", state.load, 500);
  useLayoutConfig({
    pageTitle: "Logs",
    breadcrumbs: [
      {
        name: "Logs",
      },
    ],
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <HeaderMain title="Logs" className="mb-3" />
        <Dropdown title={<i className="fas fa-cog"></i>}>
          <button
            className={
              "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            }
            onClick={state.load}
          >
            <i className="fas fa-sync mr-2"></i>
            Reload
          </button>
          <button
            className={
              "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            }
            onClick={state.clear}
          >
            <i className="fa fa-trash mr-2"></i>
            Clear Logs
          </button>
        </Dropdown>
      </div>

      <div className="flex justify-start items-center">
        <div className="absolute pl-3 pointer-events-none">
          <i className="fa fa-search"></i>
        </div>
        <input
          className="flex-1 ellipsis no-print text-base shadow-sm appearance-none border rounded py-2 pr-3 pl-10 text-grey-darker leading-none focus:outline-none  dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800"
          placeholder="Search Messages..."
          value={state.search}
          onChange={(e) => {
            state.search = e.currentTarget.value;
          }}
        />
      </div>

      <div className="border mt-3 bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner">
        {state.isLoading ? (
          <List height={"300px"} className="m-4" />
        ) : state.aggregatedLogs.length > 0 ? (
          <table className="s-table">
            <tbody>
              {state.aggregatedLogs.map((line, index) => {
                return (
                  <tr key={index}>
                    <td className="text-nowrap px-3 py-2">
                      {line.date.format("YYYY-MM-DD hh:mm:ss")}
                    </td>
                    <td className="px-3 py-2">{line.source}</td>
                    <td
                      className={classNames(
                        "px-3 py-2",
                        `color-${levelColorMap[line.level]}`
                      )}
                    >
                      {line.level}
                    </td>
                    <td className="px-3 py-2">
                      <code>{line.message}</code>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-3">There are no logs...</div>
        )}
      </div>
    </>
  );
});

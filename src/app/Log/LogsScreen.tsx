import React from "react";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";
import moment from "moment";
import classNames from "classnames";

import {
  Row,
  Col,
  Table,
  Card,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  WithLayoutMeta,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useOnChange, useOnLoad } from "~/hooks";

const matchLogReg = /\[(\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d)\] \[(\w*)\] ([\d\w\W]*)/m;

const levelColorMap = {
  warn: "warning",
  error: "danger",
  info: "info",
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

  return (
    <>
      <WithLayoutMeta
        meta={{
          pageTitle: "Logs",
          breadcrumbs: [
            {
              name: "Logs",
            },
          ],
        }}
      />
      <Row className="mb-2">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-4 pb-2">
            <HeaderMain title="Logs" className="mt-0 mb-3" />
            <div className="ml-auto d-flex align-self-center">
              <Button outline onClick={state.load} className="mr-2">
                <i className="fas fa-sync mr-2"></i> Reload
              </Button>
              <Button outline onClick={state.clear}>
                <i className="fa fa-trash mr-2"></i> Clear Logs
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <div className="mb-3">
            <Card className="p-2">
              <InputGroup color="white">
                <Input
                  placeholder="Search Messages..."
                  value={state.search}
                  onChange={(e) => {
                    state.search = e.currentTarget.value;
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" outline onClick={state.load}>
                    <i className="fa fa-search" />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Card>

            <Card className="mt-2">
              {state.isLoading ? (
                <List height={"300px"} className="m-4" />
              ) : state.aggregatedLogs.length > 0 ? (
                <Table className="m-0">
                  <tbody>
                    {state.aggregatedLogs.map((line, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-nowrap">
                            {line.date.format("YYYY-MM-DD hh:mm:ss")}
                          </td>
                          <td>{line.source}</td>
                          <td
                            className={classNames({
                              [`text-${
                                levelColorMap[line.level]
                              }`]: levelColorMap[line.level],
                            })}
                          >
                            {line.level}
                          </td>
                          <td>
                            <code>{line.message}</code>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-3">There are no logs...</div>
              )}
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
});

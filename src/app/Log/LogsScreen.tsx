import React from "react";
import { useLocalStore, observer } from "mobx-react";
import { List } from "react-content-loader";
import moment from "moment";
import classNames from "classnames";

import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { useDelay, useOnChange, useOnLoad } from "~/hooks";

const matchLogReg = /\[(\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d\.\d\d\d)\] \[(\w*)\] (.*)/;

const levelColorMap = {
  warn: "warning",
  error: "danger",
  info: "info",
};

interface LogsState {
  isDirty: boolean;
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
  isLoadingDelay: boolean;
  load: () => Promise<void>;
}

export const LogsScreen = observer(() => {
  const state = useLocalStore<LogsState>(() => ({
    isDirty: false,
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
    isLoadingDelay: false,
    load: async () => {
      state.isLoading = true;
      state.logs = await ipc.handlers.GET_LOGS(state.search, state.limit);
      state.isDirty = false;
      state.isLoading = false;
    },
  }));

  useOnLoad(state.load);
  useOnChange(state, "search", state.load, 500);
  useDelay(state, "isLoading", "isLoadingDelay");

  return (
    <Container>
      <Row className="mb-2">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-4 pb-2">
            <HeaderMain title="Logs" className="mt-0 mb-3" />
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
              {state.isLoadingDelay ? (
                <List height={"300px"} className="m-4" />
              ) : (
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
              )}
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

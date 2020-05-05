import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Table,
  Input,
} from "~/components";
import { DashboardService } from "../DashboardService";
import { numberWithCommas } from "~/tools";
import { MessageService } from "../MessageService";

export const LatestMessages = observer(() => {
  const stateDashboard = React.useContext(DashboardService);
  const stateMessage = React.useContext(MessageService);
  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      stateMessage.query = e.currentTarget.value;
    },
    [stateMessage]
  );
  return !stateDashboard.config || !stateDashboard.config.collectMessages ? (
    <></>
  ) : (
    <Accordion className="no-print-break mb-3">
      <AccordionHeader className="h6 cursor-pointer">
        <div className="d-flex justify-content-center align-items-center">
          <span>
            <strong>Messages</strong>
            <span className="small ml-2 text-muted">
              limit:{" "}
              {Math.min(stateMessage.maxMessages, stateMessage.messages.length)}
            </span>
          </span>
          <div style={{ flex: 1 }}>
            <Input
              style={{ width: "150px" }}
              outline
              placeholder="Search..."
              bsSize="sm"
              className="ml-auto align-self-end no-print"
              onClick={(e) => e.stopPropagation()}
              value={stateMessage.query}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody className="p-0">
        {stateDashboard.isLoading || stateMessage.isLoading ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <Table
            striped
            className="mb-0"
            style={{ maxWidth: "100%" }}
            responsive
          >
            <thead>
              <tr>
                <th className="bt-0">#</th>
                <th className="bt-0">Date</th>
                <th className="bt-0">User</th>
                <th className="bt-0">Repository</th>
                <th className="bt-0">Message</th>
                <th className="text-right bt-0">Activity</th>
              </tr>
            </thead>
            <tbody>
              {stateMessage.messages.map((message, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}.</td>
                    <td className="align-middle">
                      {moment(+message.date).format("YYYY-MM-DD hh:mm:ss")}
                    </td>
                    <td className="align-middle">
                      <Link to={`/user/${message.user}`}>{message.user}</Link>
                    </td>
                    <td className="align-middle">
                      <Link to={`/repository/${message.repository}`}>
                        {message.repository}
                      </Link>
                    </td>
                    <td className="align-middle">{message.message}</td>
                    <td className="align-middle">
                      {numberWithCommas(message.value)}
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

import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Column,
  Table,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";

import { numberWithCommas } from "~/tools";
import { DashboardService } from "../DashboardService";
import { MessageService, MessageState } from "../MessageService";
import { Accordion } from "~/components/Accordion/Accordion";

const UserKey = observer(
  ({
    message,
    state,
    ...props
  }: {
    state: MessageState;
    message: MessageState["messages"][0];
  } & any) => {
    return (
      <CellRenderer {...props}>
        <Link to={`/user/${message.user}`}>{message.user}</Link>
      </CellRenderer>
    );
  }
);

const RepositoryKey = observer(
  ({
    message,
    state,
    ...props
  }: {
    state: MessageState;
    message: MessageState["messages"][0];
  } & any) => {
    return (
      <CellRenderer {...props}>
        <Link to={`/repository/${message.repository}`}>
          {message.repository}
        </Link>
      </CellRenderer>
    );
  }
);

const MessageValue = observer(
  ({ message, ...props }: { message: MessageState["messages"][0] } & any) => {
    return (
      <CellRenderer {...props}>{numberWithCommas(message.value)}</CellRenderer>
    );
  }
);

const MessageDate = observer(
  ({ message, ...props }: { message: MessageState["messages"][0] } & any) => {
    return (
      <CellRenderer {...props}>
        {moment(+message.date).format("YYYY-MM-DD hh:mm:ss")}
      </CellRenderer>
    );
  }
);

const CellRenderer = ({ dataKey, parent, rowIndex, cache, children }: any) => {
  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={dataKey}
      parent={parent}
      rowIndex={rowIndex}
    >
      {children}
    </CellMeasurer>
  );
};

const MessagesTable = observer(
  ({
    cache,
    width,
    height,
    state,
  }: {
    state: MessageState;
  } & any) => {
    return (
      <Table
        columnWidth={cache.columnWidth}
        overscanRowCount={10}
        width={width}
        height={height}
        headerHeight={35}
        rowHeight={cache.rowHeight}
        rowCount={state.messages.length}
        rowGetter={({ index }) => state.messages[index]}
        rowClassName={({ index }) => {
          return index % 2 === 0 ? "odd" : "even";
        }}
      >
        <Column
          label="#"
          dataKey="index"
          width={90}
          headerClassName="justify-content-end"
          className="text-right"
          cellRenderer={({ rowIndex, ...props }) => (
            <CellRenderer cache={cache} {...props}>
              {rowIndex + 1}
            </CellRenderer>
          )}
        />
        <Column
          width={400}
          label="Date"
          dataKey="date"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <MessageDate
              state={state}
              message={rowData}
              cache={cache}
              {...props}
            />
          )}
        />
        <Column
          width={400}
          label="User"
          dataKey="user"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <UserKey state={state} message={rowData} cache={cache} {...props} />
          )}
        />
        <Column
          width={400}
          label="Repository"
          dataKey="repository"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <RepositoryKey
              state={state}
              message={rowData}
              cache={cache}
              {...props}
            />
          )}
        />
        <Column
          width={400}
          label="Message"
          dataKey="message"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <CellRenderer cache={cache} {...props}>
              {rowData.message}
            </CellRenderer>
          )}
        />
        <Column
          width={300}
          label="Activity"
          dataKey="valueTotal"
          headerClassName="justify-content-end"
          className="align-middle hyphenate text-right"
          cellRenderer={({ rowData, ...props }) => (
            <MessageValue message={rowData} cache={cache} {...props} />
          )}
        />
      </Table>
    );
  }
);

export const LatestMessages = observer(() => {
  const stateDashboard = React.useContext(DashboardService);
  const stateMessage = React.useContext(MessageService);
  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      stateMessage.query = e.currentTarget.value;
    },
    [stateMessage]
  );
  const [storage] = React.useState(() => ({
    cache: new CellMeasurerCache({
      fixedWidth: true,
      fixedHeight: false,
      defaultHeight: 40,
      defaultWidth: 150,
      minHeight: 40,
    }),
  }));
  return (
    stateDashboard.config &&
    stateDashboard.config.collectMessages && (
      <Accordion
        className="no-print mt-3"
        title={
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              Messages
              <span className="text-sm ml-2 text-gray-600">
                limit:{" "}
                {Math.min(
                  stateMessage.maxMessages,
                  stateMessage.messages.length
                )}
              </span>
            </div>

            <div className="flex justify-start items-center">
              <div
                className={classNames("absolute pl-3 pointer-events-none", {
                  "text-gray-500": !stateMessage.query,
                })}
              >
                <i className="fa fa-search"></i>
              </div>
              <input
                placeholder="Search..."
                className="ellipsis no-print text-base shadow-sm appearance-none border rounded py-2 pr-3 pl-10 text-grey-darker leading-none focus:outline-none focus:shadow-outline"
                value={stateMessage.query}
                onChange={onSearchChange}
              />
            </div>
          </div>
        }
      >
        {stateDashboard.isLoading || stateMessage.isLoading ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <div className="w-full" style={{ height: "450px" }}>
            <AutoSizer>
              {({ width, height }) => (
                <MessagesTable
                  width={width}
                  height={height}
                  state={stateMessage}
                  cache={storage.cache}
                />
              )}
            </AutoSizer>
          </div>
        )}
      </Accordion>
    )
  );
});

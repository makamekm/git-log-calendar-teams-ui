import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Link } from "react-router-dom";
import {
  Column,
  Table,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";

import { numberWithCommas } from "~/tools";
import {
  RepositoryUserService,
  RepositoryUserState,
} from "../../RepositoryUserService";
import { DashboardState } from "../../DashboardService";
import { Accordion } from "~/components/Accordion/Accordion";

const UserKey = observer(
  ({
    user,
    state,
    ...props
  }: {
    state: RepositoryUserState;
    user: RepositoryUserState["tableRepositoryUsers"][0];
  } & any) => {
    return (
      <CellRenderer {...props}>
        {user.user ? (
          <Link to={`/user/${user.user.name}`}>{user.user.name}</Link>
        ) : (
          <Link to={`/user/${user.userKey}`}>{user.userKey}</Link>
        )}
      </CellRenderer>
    );
  }
);

const UserTotalValue = observer(
  ({
    user,
    ...props
  }: { user: RepositoryUserState["tableRepositoryUsers"][0] } & any) => {
    return (
      <CellRenderer {...props}>
        {numberWithCommas(user.valueTotal)}
      </CellRenderer>
    );
  }
);

const UserValue = observer(
  ({
    user,
    ...props
  }: { user: RepositoryUserState["tableRepositoryUsers"][0] } & any) => {
    return (
      <CellRenderer {...props}>{numberWithCommas(user.value)}</CellRenderer>
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

const UserTable = observer(
  ({
    cache,
    width,
    height,
    state,
  }: {
    state: DashboardState;
  } & any) => {
    return (
      <Table
        columnWidth={cache.columnWidth}
        overscanRowCount={10}
        width={width}
        height={height}
        headerHeight={35}
        rowHeight={cache.rowHeight}
        rowCount={state.tableRepositoryUsers.length}
        rowGetter={({ index }) => state.tableRepositoryUsers[index]}
        className="mb-0"
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
          label="Key"
          dataKey="userKey"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <UserKey state={state} user={rowData} cache={cache} {...props} />
          )}
        />
        <Column
          width={400}
          label="Name"
          dataKey="name"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <CellRenderer cache={cache} {...props}>
              {rowData.name}
            </CellRenderer>
          )}
        />
        <Column
          width={400}
          label="Email"
          dataKey="email"
          className="align-middle hyphenate"
          cellRenderer={({ rowData, ...props }) => (
            <CellRenderer cache={cache} {...props}>
              {rowData.email}
            </CellRenderer>
          )}
        />
        <Column
          width={300}
          label="Activity"
          dataKey="value"
          headerClassName="justify-content-end"
          className="align-middle hyphenate text-right"
          cellRenderer={({ rowData, ...props }) => (
            <UserValue user={rowData} cache={cache} {...props} />
          )}
        />
        <Column
          width={300}
          label="Total Activity"
          dataKey="valueTotal"
          headerClassName="justify-content-end"
          className="align-middle hyphenate text-right"
          cellRenderer={({ rowData, ...props }) => (
            <UserTotalValue user={rowData} cache={cache} {...props} />
          )}
        />
      </Table>
    );
  }
);

export const RepositoryUsersDashboard = observer(() => {
  const state = React.useContext(RepositoryUserService);
  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      state.usersQuery = e.currentTarget.value;
    },
    [state]
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
    <Accordion
      className="mt-3 no-print"
      title={
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">Repository Users</div>

          <div className="flex justify-start items-center">
            <div
              className={classNames("absolute pl-3 pointer-events-none", {
                "text-gray-500": !state.usersQuery,
              })}
            >
              <i className="fa fa-search"></i>
            </div>
            <input
              placeholder="Search..."
              className="ellipsis no-print text-base shadow-sm appearance-none border rounded py-2 pr-3 pl-10 text-grey-darker leading-none focus:outline-none  dark-mode:border-gray-700 dark-mode:text-white dark-mode:bg-gray-800"
              value={state.usersQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
      }
    >
      {state.isLoading || !storage.cache ? (
        <List className="m-4" height="200px" width="100%" />
      ) : (
        <div className="w-full" style={{ height: "450px" }}>
          <AutoSizer>
            {({ width, height }) => (
              <UserTable
                width={width}
                height={height}
                state={state}
                cache={storage.cache}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </Accordion>
  );
});

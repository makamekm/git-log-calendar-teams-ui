import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Link } from "react-router-dom";
import {
  Column,
  Table,
  AutoSizer,
  CellMeasurerCache,
  WindowScroller,
  CellMeasurer,
} from "react-virtualized";

import { Accordion, AccordionHeader, AccordionBody, Input } from "~/components";
import { numberWithCommas } from "~/tools";
import {
  RepositoryUserService,
  RepositoryUserState,
} from "../RepositoryUserService";
import { DashboardState } from "../DashboardService";

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
    <Accordion className="mb-3 no-print">
      <AccordionHeader className="h6 cursor-pointer">
        <div className="d-flex justify-content-center align-items-center">
          <div>Repository Users</div>
          <div style={{ flex: 1 }}>
            <Input
              style={{ width: "150px" }}
              outline
              placeholder="Search..."
              bsSize="sm"
              className="ml-auto align-self-end no-print"
              onClick={(e) => e.stopPropagation()}
              value={state.usersQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody className="p-0">
        {state.isLoadingDelay || !storage.cache ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <div style={{ height: "450px" }}>
            <WindowScroller>
              {() => (
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
              )}
            </WindowScroller>
          </div>
        )}
      </AccordionBody>
    </Accordion>
  );
});

import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import {
  Column,
  Table,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";

import { ConfigurationState } from "./ConfigurationState";
import { numberWithCommas } from "~/tools";
import { Accordion } from "~/components/Accordion/Accordion";

const UserKey = observer(
  ({
    user,
    state,
    ...props
  }: {
    state: ConfigurationState;
    user: ConfigurationState["allUsersQueryed"][0];
  } & any) => {
    const registered =
      user.user ||
      state.config.users.find(
        (u) =>
          u.associations.includes(user.email) ||
          u.associations.includes(user.name)
      );
    return (
      <CellRenderer {...props}>
        {registered ? registered.name : user.userKey}
      </CellRenderer>
    );
  }
);

const UserTotalValue = observer(
  ({
    user,
    ...props
  }: { user: ConfigurationState["allUsersQueryed"][0] } & any) => {
    return (
      <CellRenderer {...props}>
        {numberWithCommas(user.valueTotal)}
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

const UserActions = observer(
  ({
    user,
    state,
    ...props
  }: {
    state: ConfigurationState;
    user: ConfigurationState["allUsersQueryed"][0];
  } & any) => {
    const registered =
      user.user ||
      state.config.users.find(
        (u) =>
          u.associations.includes(user.email) ||
          u.associations.includes(user.name)
      );
    const onRegisterUser = () => {
      const name = user.name
        .toLowerCase()
        .split(" ")
        .map((s) => {
          s = s.trim();
          return s.charAt(0).toUpperCase() + s.slice(0);
        })
        .join(" ");

      if (
        !state.config.users.find(
          (u) =>
            u.name === name ||
            u.associations.includes(user.email) ||
            u.associations.includes(user.name)
        )
      ) {
        state.config.users.unshift({
          id: String(Math.random() * 10000),
          associations: [user.email, user.name],
          name,
        });
      }
    };
    return (
      <CellRenderer {...props}>
        {!registered && (
          <button
            className="text-xs font-normal border py-1 px-3 rounded-lg dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            onClick={onRegisterUser}
          >
            <i className="fa fa-plus mr-2"></i>Add
          </button>
        )}
      </CellRenderer>
    );
  }
);

const UserTable = observer(
  ({
    cache,
    width,
    height,
    state,
  }: {
    state: ConfigurationState;
  } & any) => {
    return (
      <Table
        columnWidth={cache.columnWidth}
        overscanRowCount={10}
        width={width}
        height={height}
        headerHeight={35}
        rowHeight={cache.rowHeight}
        rowCount={state.allUsersQueryed.length}
        rowGetter={({ index }) => state.allUsersQueryed[index]}
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
          label="Total Activity"
          dataKey="valueTotal"
          headerClassName="justify-content-end"
          className="align-middle hyphenate text-right"
          cellRenderer={({ rowData, ...props }) => (
            <UserTotalValue user={rowData} cache={cache} {...props} />
          )}
        />
        <Column
          width={150}
          label="Actions"
          dataKey="actions"
          headerClassName="justify-content-end"
          className="align-middle hyphenate text-right"
          cellRenderer={({ rowData, ...props }) => (
            <UserActions
              state={state}
              user={rowData}
              cache={cache}
              {...props}
            />
          )}
        />
      </Table>
    );
  }
);

export const ConfigurationAllUsers = observer(
  ({ state }: { state: ConfigurationState }) => {
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
        className="mb-3 no-print"
        initialOpen
        title={
          <div className="flex justify-between items-center w-full">
            <div>
              All Repository Users
              <span className="text-sm ml-2 text-gray-600">#1.04</span>
            </div>

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
                className="ellipsis no-print text-base shadow-sm appearance-none border rounded py-2 pr-3 pl-10 text-grey-darker leading-none focus:outline-none focus:shadow-outline"
                value={state.usersQuery}
                onChange={onSearchChange}
              />
            </div>
          </div>
        }
      >
        {!state.config || state.isLoading || !storage.cache ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <div style={{ height: "450px" }}>
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
  }
);

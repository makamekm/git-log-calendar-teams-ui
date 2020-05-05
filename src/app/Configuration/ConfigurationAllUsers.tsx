import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import {
  Input,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Table,
  Button,
} from "~/components";
import { ConfigurationState } from "./ConfigurationState";
import { numberWithCommas } from "~/tools";

const UserRow = observer(
  ({
    state,
    user,
    index,
  }: {
    state: ConfigurationState;
    user: ConfigurationState["allUsersQueryed"][0];
    index: number;
  }) => {
    const onRegisterUser = React.useCallback(async () => {
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
          id: "",
          associations: [user.email, user.name],
          name,
        });
      }
    }, [state, user]);
    const registered =
      user.user ||
      state.config.users.find(
        (u) =>
          u.associations.includes(user.email) ||
          u.associations.includes(user.name)
      );

    return (
      <tr>
        <td className="align-middle">{index + 1}.</td>
        <td className="align-middle hyphenate">
          {registered ? registered.name : user.userKey}
        </td>
        <td className="align-middle hyphenate">{user.name}</td>
        <td className="align-middle hyphenate">{user.email}</td>
        <td className="text-right align-middle">
          {numberWithCommas(user.valueTotal)}
        </td>
        <td className="text-right align-middle">
          {!registered && (
            <Button size="sm" onClick={onRegisterUser}>
              Register
            </Button>
          )}
        </td>
      </tr>
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
    return (
      <Accordion className="mb-3">
        <AccordionHeader className="h6 cursor-pointer">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              All Repository Users
              <span className="small ml-1 text-muted">#1.04</span>
            </div>
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
          {!state.config || state.isLoadingDelay ? (
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
                  <th className="bt-0">Key</th>
                  <th className="bt-0">Name</th>
                  <th className="bt-0">Email</th>
                  <th className="text-right bt-0">Total Activity</th>
                  <th className="text-right bt-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.allUsersQueryed.map((user, index) => {
                  return (
                    <UserRow
                      state={state}
                      user={user}
                      key={index}
                      index={index}
                    />
                  );
                })}
              </tbody>
            </Table>
          )}
        </AccordionBody>
      </Accordion>
    );
  }
);

import React from "react";
import {
  Nav,
  NavItem,
  Media,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  NavLink,
  AvatarAddonIcon,
  AvatarFont,
} from "~/components";
import { observer } from "mobx-react";
import { ChatScreenState } from "./Chat";
import { ChatService } from "../ChatService";

export const ChatLeftNav = observer(({ state }: { state: ChatScreenState }) => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      {/* START Left Nav  */}
      <div className="mb-4">
        {/* <div className="small mb-3">Search</div> */}
        <InputGroup>
          <Input placeholder="Add Room..." />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary">
              <i className="fa fa-plus"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      {/* END Left Nav  */}
      {/* START Left Nav  */}
      <div className="mb-4">
        <div className="mt-4 mb-2">
          <span className="small">Chat Rooms</span>
        </div>
        <Nav pills vertical className="chat-user-list-box">
          {service.users.map((user) => {
            return (
              <NavItem key={user.email}>
                <NavLink
                  className="cursor-pointer"
                  active={state.selectedEmail === user.email}
                  onClick={() => {
                    state.selectedEmail = user.email;
                  }}
                >
                  <Media>
                    <Media left className="align-self-start mr-3">
                      <AvatarFont
                        bgColor="info"
                        size="sm"
                        addOns={[
                          <AvatarAddonIcon
                            className="fa fa-circle"
                            color={user.online ? "success" : "danger"}
                            key="avatar-icon-fg"
                          />,
                        ]}
                      >
                        {user.email.substr(0, 2).toUpperCase()}
                      </AvatarFont>
                    </Media>
                    <Media body>
                      <div className="mt-0 d-flex">{user.email}</div>
                      {/* <span className="small">{faker.address.country()}</span> */}
                    </Media>
                  </Media>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </div>
      {/* END Left Nav  */}
    </React.Fragment>
  );
});

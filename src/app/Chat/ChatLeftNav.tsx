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
import { ChatService } from "../ChatService";

export const ChatLeftNavUser = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      {/* START Left Nav  */}
      <div className="mb-4">
        {/* <div className="small mb-3">Search</div> */}
        <InputGroup>
          <Input
            value={service.userSearch}
            onChange={(e) => {
              service.userSearch = e.currentTarget.value;
            }}
            placeholder="Search a User..."
          />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary">
              <i className="fa fa-search"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      {/* END Left Nav  */}
      {/* START Left Nav  */}
      <div className="mb-4">
        <div className="mt-4 mb-2">
          <span className="small">Users</span>
          {service.users.length === 0 && (
            <div className="small text-center">
              {"<"} No Users {">"}
            </div>
          )}
        </div>
        <Nav pills vertical className="chat-user-list-box">
          {service.users.map((user) => {
            return (
              <NavItem key={user.email}>
                <NavLink
                  className="cursor-pointer"
                  active={service.selectedEmail === user.email}
                  onClick={() => {
                    service.selectedChannel = null;
                    service.selectedEmail = user.email;
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

export const ChatLeftNavChannel = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      {/* START Left Nav  */}
      <div className="mb-4">
        {/* <div className="small mb-3">Search</div> */}
        <InputGroup>
          <Input
            value={service.createChannelName}
            onChange={(e) => {
              service.createChannelName = e.currentTarget.value;
            }}
            onKeyDown={(e) => {
              e.keyCode === 13 && service.createChannel();
            }}
            placeholder="Add a Room..."
          />
          <InputGroupAddon addonType="append" onClick={service.createChannel}>
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
          <span className="small">Channels</span>
        </div>
        <Nav pills vertical className="chat-user-list-box">
          {service.channelList.length === 0 && (
            <div className="small text-center">
              {"<"} No Channels {">"}
            </div>
          )}
          {service.channelList.map((channelName) => {
            return (
              <NavItem key={channelName}>
                <NavLink
                  className="cursor-pointer"
                  active={service.selectedChannel === channelName}
                  onClick={() => {
                    service.selectedEmail = null;
                    service.selectedChannel = channelName;
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
                            color={
                              service.isChannelOnline(channelName)
                                ? "success"
                                : "danger"
                            }
                            key="avatar-icon-fg"
                          />,
                        ]}
                      >
                        {channelName.substr(0, 2).toUpperCase()}
                      </AvatarFont>
                    </Media>
                    <Media body>
                      <div className="mt-0 d-flex">{channelName}</div>
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

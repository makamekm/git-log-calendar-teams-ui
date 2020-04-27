import React from "react";
import faker from "faker/locale/en_US";
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
  AvatarImage,
} from "~/components";
import { randomAvatar } from "~/utilities";
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
          <Input placeholder="Add Chat..." />
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
          <span className="small">Chat Rooms</span>
        </div>
        <Nav pills vertical>
          {service.users.map((email) => {
            return (
              <NavItem>
                <NavLink
                  active={state.selectedEmail === email}
                  onClick={() => {
                    state.selectedEmail = email;
                  }}
                >
                  <Media>
                    <Media left className="align-self-start mr-3">
                      <AvatarImage
                        size="sm"
                        src={randomAvatar()}
                        addOns={[
                          <AvatarAddonIcon
                            className="fa fa-circle"
                            color="primary"
                            key="avatar-icon-bg"
                          />,
                          <AvatarAddonIcon
                            className="fa fa-circle"
                            color="danger"
                            key="avatar-icon-fg"
                          />,
                        ]}
                      />
                    </Media>
                    <Media body>
                      <div className="mt-0 d-flex">{email}</div>
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

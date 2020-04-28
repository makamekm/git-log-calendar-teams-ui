import React from "react";

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "~/components";
import { observer } from "mobx-react";
import { ChatService } from "../ChatService";

export const ChatCardHeaderUser = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <h6 className="align-self-center mb-0">{service.selectedEmail}</h6>
      <div className="align-self-center ml-auto d-flex align-items-center">
        <Button outline>
          <i className="fa fa-phone"></i>
        </Button>
        <UncontrolledButtonDropdown>
          <DropdownToggle
            color="link"
            size="sm"
            className="text-decoration-none"
          >
            <i className="fa fa-gear"></i>
            <i className="fa fa-angle-down ml-2"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <i className="fas fa-broom mr-2"></i>
              Clear History
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-comment mr-2"></i>
              Unregister this User
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <i className="fa fa-ban mr-2"></i>
              Block this User
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </React.Fragment>
  );
});

export const ChatCardHeaderChannel = observer(() => {
  const service = React.useContext(ChatService);
  return (
    <React.Fragment>
      <h6 id="channel-header" className="align-self-center mb-0 cursor-pointer">
        {service.selectedChannel}
      </h6>
      <UncontrolledPopover placement="bottom" target="channel-header">
        <PopoverHeader>List of Users</PopoverHeader>
        <PopoverBody className="text-white">
          <ul className="mb-0 pl-4">
            {service.channels[service.selectedChannel].map((user) => (
              <li>{user}</li>
            ))}
          </ul>
        </PopoverBody>
      </UncontrolledPopover>
      <div className="align-self-center ml-auto d-flex align-items-center">
        <Button outline>
          <i className="fa fa-phone"></i>
        </Button>
        <UncontrolledButtonDropdown>
          <DropdownToggle
            color="link"
            size="sm"
            className="text-decoration-none"
          >
            <i className="fa fa-gear"></i>
            <i className="fa fa-angle-down ml-2"></i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <i className="fas fa-broom mr-2"></i>
              Clear History
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-comment mr-2"></i>
              Delete this User
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    </React.Fragment>
  );
});

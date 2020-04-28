import React from "react";

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
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
      <h6 className="align-self-center mb-0">{service.selectedChannel}</h6>
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

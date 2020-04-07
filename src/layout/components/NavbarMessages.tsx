import React from "react";
import faker from "faker/locale/en_US";
import _ from "lodash";
import {
  UncontrolledDropdown,
  DropdownToggle,
  Badge,
  InputGroup,
  Input,
  Button,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";
import { IconWithBadge } from "../../components/IconWithBadge/IconWithBadge";
import { ExtendedDropdown } from "../../components/ExtendedDropdown/ExtendedDropdown";
import { ExtendedDropdownSection } from "../../components/ExtendedDropdown/ExtendedDropdownSection";
import { ExtendedDropdownLink } from "../../components/ExtendedDropdown/ExtendedDropdownLink";
import { InputGroupAddon } from "../../components/InputGroupAddon/InputGroupAddon";
import { AvatarImage } from "../../components/Avatar/AvatarImage";

const messagesColors = ["text-success", "text-danger", "text-warning"];

const NavbarMessages = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <UncontrolledDropdown nav inNavbar {...props}>
    <DropdownToggle nav>
      <IconWithBadge
        badge={
          <Badge pill color="secondary">
            6
          </Badge>
        }
      >
        <i className="fa fa-envelope-o fa-fw" />
      </IconWithBadge>
    </DropdownToggle>
    <ExtendedDropdown right>
      <ExtendedDropdownSection className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Messages</h6>
        <ExtendedDropdownLink to="/apps/new-email">
          <i className="fa fa-pencil" />
        </ExtendedDropdownLink>
      </ExtendedDropdownSection>
      <ExtendedDropdownSection>
        <InputGroup>
          <Input placeholder="Search Messages..." />
          <InputGroupAddon addonType="append">
            <Button color="secondary" outline>
              <i className="fa fa-search" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </ExtendedDropdownSection>

      <ExtendedDropdownSection list>
        <ListGroup>
          {_.times(3, (index) => (
            <ListGroupItem
              tag={ExtendedDropdownLink}
              to="/apps/email-details"
              key={index}
              action
            >
              <Media>
                <Media left>
                  <AvatarImage src={faker.image.avatar()} className="mr-4" />
                </Media>
                <Media body>
                  <span className="d-flex justify-content-start">
                    <i
                      className={`fa fa-circle small ${messagesColors[index]} mr-2 d-flex align-items-center`}
                    />
                    <span className="h6 pb-0 mb-0 d-flex align-items-center">
                      {faker.name.firstName()} {faker.name.lastName()}
                    </span>

                    <span className="ml-1 small">(23)</span>
                    <span className="ml-auto small">Now</span>
                  </span>
                  <p className="mt-2 mb-1">{faker.lorem.sentences()}</p>
                </Media>
              </Media>
            </ListGroupItem>
          ))}
        </ListGroup>
      </ExtendedDropdownSection>

      <ExtendedDropdownSection
        className="text-center"
        tag={ExtendedDropdownLink}
        to="/apps/inbox"
      >
        View All
        <i className="fa fa-angle-right fa-fw ml-2" />
      </ExtendedDropdownSection>
    </ExtendedDropdown>
  </UncontrolledDropdown>
);

export { NavbarMessages };

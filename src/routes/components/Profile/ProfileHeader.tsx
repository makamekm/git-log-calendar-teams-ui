import React from "react";
import { Link } from "react-router-dom";
import faker from "faker/locale/en_US";

import { randomAvatar } from "../../../utilities";
import { Media, Badge } from "reactstrap";
import { AvatarImage } from "../../../components/Avatar/AvatarImage";
import { AvatarAddonIcon } from "../../../components/Avatar/AvatarAddonIcon";

const ProfileHeader = () => (
  <React.Fragment>
    {/* START Header */}
    <Media className="mb-3">
      <Media left middle className="mr-3 align-self-center">
        <AvatarImage
          size="lg"
          src={randomAvatar()}
          className="mr-2"
          addOns={[
            <AvatarAddonIcon
              className="fa fa-circle"
              color="white"
              key="avatar-icon-bg"
            />,
            <AvatarAddonIcon
              className="fa fa-circle"
              color="success"
              key="avatar-icon-fg"
            />,
          ]}
        />
      </Media>
      <Media body>
        <h5 className="mb-1 mt-0">
          <Link to="/apps/profile-details">
            {faker.name.firstName()} {faker.name.lastName()}
          </Link>{" "}
          <span className="text-muted mx-1"> / </span> Profile Edit
        </h5>
        <Badge color="primary" pill className="mr-2">
          Premium
        </Badge>
        <span className="text-muted">Edit Your Name, Avatar, etc.</span>
      </Media>
    </Media>
    {/* END Header */}
  </React.Fragment>
);

export { ProfileHeader };

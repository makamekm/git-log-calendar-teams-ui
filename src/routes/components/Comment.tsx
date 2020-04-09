/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import faker from "faker/locale/en_US";
import { randomArray, randomAvatar } from "../../utilities";
import { Media, UncontrolledTooltip, AvatarImage, AvatarAddonIcon } from "@lib";

const status = ["success", "danger", "warning", "secondary"];

const Comment = (props: { mediaClassName?: string }) => (
  <Media className={`mb-4 ${props.mediaClassName}`}>
    <Media left className="mr-3">
      <AvatarImage
        size="md"
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
            color={randomArray(status)}
            key="avatar-icon-fg"
          />,
        ]}
      />
    </Media>
    <Media body>
      <div className="mb-2">
        <span className="text-inverse mr-2">
          {faker.name.firstName()} {faker.name.firstName()}
        </span>
        <span className="small">13-Jun-2015, 08:13</span>
      </div>
      <p className="mb-1">{faker.lorem.paragraph()}</p>
      <div>
        <span className="text-success mr-2">+92</span>
        <a href="#" id="tooltipVoteUp1" className="mr-2">
          <i className="fa fa-angle-up text-success"></i>
        </a>
        <UncontrolledTooltip placement="top" target="tooltipVoteUp1">
          Vote Up
        </UncontrolledTooltip>
        <a href="#" id="tooltipVoteDown2" className="mr-2">
          <i className="fa fa-angle-down text-danger"></i>
        </a>
        <UncontrolledTooltip placement="bottom" target="tooltipVoteDown2">
          Vote Down
        </UncontrolledTooltip>
        <span className="mr-2">·</span>
        <a href="#" className="mr-2">
          Reply
        </a>
        <span className="mr-2">·</span>
        <a href="#">Edit</a>
      </div>
    </Media>
  </Media>
);

Comment.defaultProps = {
  mediaClassName: "text-empty",
};

export { Comment };

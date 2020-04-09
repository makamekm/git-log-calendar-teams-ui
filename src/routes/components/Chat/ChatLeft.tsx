import React from "react";
import faker from "faker/locale/en_US";
import { Card, Media, AvatarAddonIcon, AvatarImage } from "@lib";
import { randomArray, randomAvatar } from "~/utilities";

const status = ["warning", "danger", "success", "secondary"];

const ChatLeft = (props: { cardClassName?: any }) => (
  <React.Fragment>
    <Media className="mb-2">
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
        <Card body className={`mb-2 ${props.cardClassName}`}>
          <p className="mb-0">{faker.lorem.paragraph()}</p>
        </Card>
        <div className="mb-2">
          <span className="text-inverse mr-2">
            {faker.name.firstName()} {faker.name.firstName()}
          </span>
          <span className="small">13-Jun-2015, 08:13</span>
        </div>
      </Media>
    </Media>
  </React.Fragment>
);

ChatLeft.defaultProps = {
  cardClassName: "bg-white",
};

export { ChatLeft };

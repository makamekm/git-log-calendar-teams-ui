import React from "react";
import faker from "faker/locale/en_US";
import { Card, Media, AvatarImage, AvatarAddonIcon } from "@lib";
import { randomArray, randomAvatar } from "~/utilities";

const status = ["warning", "danger", "success", "secondary"];

const ChatRight = (props: { cardClassName?: string }) => (
  <React.Fragment>
    <Media className="mb-2">
      <Media body>
        <Card body className={`mb-2 ${props.cardClassName}`}>
          <p className="mb-0">{faker.lorem.paragraph()}</p>
        </Card>
        <div className="mb-2 text-right">
          <span className="text-inverse mr-2">
            {faker.name.firstName()} {faker.name.firstName()}
          </span>
          <span className="small">13-Jun-2015, 08:13</span>
        </div>
      </Media>
      <Media right className="ml-3">
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
    </Media>
  </React.Fragment>
);

ChatRight.defaultProps = {
  cardClassName: "bg-white",
};

export { ChatRight };

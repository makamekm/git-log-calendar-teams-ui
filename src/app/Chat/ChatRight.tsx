import React from "react";
import { Card, Media, AvatarImage, AvatarAddonIcon } from "~/components";
import { randomArray, randomAvatar } from "~/utilities";

const status = ["warning", "danger", "success", "secondary"];

const ChatRight: React.FC<{
  cardClassName?: string;
  text: any;
  author: any;
  date: any;
}> = (props) => (
  <React.Fragment>
    <Media className="mb-2">
      <Media body>
        <Card body className={`mb-2 ${props.cardClassName}`}>
          <p className="mb-0">{props.text}</p>
        </Card>
        <div className="mb-2 text-right">
          <span className="text-inverse mr-2">{props.author}</span>
          <span className="small">{props.date}</span>
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

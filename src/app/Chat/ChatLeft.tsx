import React from "react";
import { Card, Media, AvatarAddonIcon, AvatarImage } from "~/components";
import { randomArray, randomAvatar } from "~/utilities";

const status = ["warning", "danger", "success", "secondary"];

const ChatLeft: React.FC<{
  cardClassName?: string;
  text: any;
  author: any;
  date: any;
}> = (props) => (
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
          <p className="mb-0">{props.text}</p>
        </Card>
        <div className="mb-2">
          <span className="text-inverse mr-2">{props.author}</span>
          <span className="small">{props.date}</span>
        </div>
      </Media>
    </Media>
  </React.Fragment>
);

ChatLeft.defaultProps = {
  cardClassName: "bg-white",
};

export { ChatLeft };

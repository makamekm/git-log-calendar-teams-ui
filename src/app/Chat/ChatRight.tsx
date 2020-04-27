import React from "react";
import { Card, Media, AvatarAddonIcon, AvatarFont } from "~/components";

const status = ["warning", "danger", "success", "secondary"];

const ChatRight: React.FC<{
  cardClassName?: string;
  text: any;
  author: any;
  date: any;
  online?: boolean;
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
        <AvatarFont
          bgColor="info"
          size="md"
          addOns={[
            <AvatarAddonIcon
              className="fa fa-circle"
              color={props.online ? "success" : "danger"}
              key="avatar-icon-fg"
            />,
          ]}
        >
          {props.author.substr(0, 2).toUpperCase()}
        </AvatarFont>
      </Media>
    </Media>
  </React.Fragment>
);

ChatRight.defaultProps = {
  cardClassName: "bg-white",
};

export { ChatRight };

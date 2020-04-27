import React from "react";
import { Card, Media, AvatarAddonIcon, AvatarFont } from "~/components";

const ChatLeft: React.FC<{
  cardClassName?: string;
  text: any;
  author: any;
  date: any;
  online?: boolean;
}> = (props) => (
  <React.Fragment>
    <Media className="mb-2">
      <Media left className="mr-3">
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

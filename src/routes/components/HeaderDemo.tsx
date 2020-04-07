import React from "react";
import { Media } from "reactstrap";

const HeaderDemo = (props: {
  no?: string | number;
  title?: string;
  subTitle?: string;
  children?: any;
  className?: string;
}) => (
  <Media className={`mb-3 ${props.className}`}>
    <Media left top>
      <h1 className="mr-3 display-4 text-muted">{props.no}.</h1>
    </Media>
    <Media body>
      <h4 className="mt-1">{props.title}</h4>
      <p>{props.children || props.subTitle}</p>
    </Media>
  </Media>
);

HeaderDemo.defaultProps = {
  no: 0,
  title: "Waiting for Data...",
  subTitle: "Waiting for Data...",
};

export { HeaderDemo };

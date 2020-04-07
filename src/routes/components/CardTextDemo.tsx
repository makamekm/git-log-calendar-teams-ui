import React from "react";
import { CardText } from "reactstrap";

const CardTextDemo = (props: { cardNo?: any }) => (
  <CardText>
    <span className="mr-2">#{props.cardNo}</span>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl elit,
    porta a sapien eget, fringilla sagittis ex.
  </CardText>
);

CardTextDemo.defaultProps = {
  cardNo: "?.??",
};

export { CardTextDemo };

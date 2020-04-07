import React from "react";
import classNames from "classnames";
import { Card as BsCard, CardProps } from "reactstrap";

import classes from "./Card.scss";

const Card = (
  props: CardProps & {
    type?: string;
    color?: string;
  }
) => {
  const { children, type, color, className, ...otherProps } = props;
  const cardClass = classNames(
    className,
    classes["custom-card"],
    classes[`custom-card--${type}`],
    color && classes[`custom-card--color-${color}`]
  );
  return (
    <BsCard className={cardClass} {...otherProps}>
      {children}
    </BsCard>
  );
};

Card.defaultProps = {
  type: "border",
  color: null,
};

export { Card };

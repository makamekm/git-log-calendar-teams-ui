import React from "react";
import classNames from "classnames";
import { Card as BsCard, CardProps } from "reactstrap";

import "./Card.scss";

const Card = (
  props: CardProps & {
    type?: string;
    color?: string;
  }
) => {
  const { children, type, color, className, ...otherProps } = props;
  const cardClass = classNames(
    className,
    "custom-card",
    type && `custom-card--${type}`,
    color && `custom-card--color-${color}`
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

import React from "react";
import classNames from "classnames";
import { CardHeader as BsCardHeader, CardHeaderProps } from "reactstrap";

import classes from "./CardHeader.scss";

const CardHeader = (
  props: CardHeaderProps & {
    type?: string;
    color?: string;
    className?: string;
  }
) => {
  const { type, color, className, children, ...otherProps } = props;
  const cardHeaderClass = classNames(
    className,
    classes["custom-card-header"],
    type && classes[`custom-card-header--${type}`],
    color && classes[`custom-card-header--color-${color}`]
  );
  return (
    <BsCardHeader className={cardHeaderClass} {...otherProps}>
      {children}
    </BsCardHeader>
  );
};

export { CardHeader };

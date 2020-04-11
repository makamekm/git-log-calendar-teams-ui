import React from "react";
import classNames from "classnames";
import { CardHeader as BsCardHeader, CardHeaderProps } from "reactstrap";

import "./CardHeader.scss";

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
    "custom-card-header",
    type && `custom-card-header--${type}`,
    color && `custom-card-header--color-${color}`
  );
  return (
    <BsCardHeader className={cardHeaderClass} {...otherProps}>
      {children}
    </BsCardHeader>
  );
};

export { CardHeader };

import React from "react";
import classNames from "classnames";
import { DropdownMenu, DropdownMenuProps } from "reactstrap";

export const ExtendedDropdown = ({
  className,
  ...otherProps
}: DropdownMenuProps & {
  className?: string;
}) => {
  const classes = classNames(className, "extended-dropdown");
  return <DropdownMenu className={classes} {...otherProps} />;
};

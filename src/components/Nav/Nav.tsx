import React from "react";
import classNames from "classnames";

import { Nav as BsNav, NavProps } from "reactstrap";

const Nav = ({
  accent,
  className,
  ...otherProps
}: NavProps & {
  accent?: boolean;
}) => {
  return (
    <BsNav
      className={classNames(className, "nav", { "nav-accent": accent })}
      {...(otherProps as any)}
    />
  );
};

Nav.defaultProps = {
  accent: false,
};

export { Nav };

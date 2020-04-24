import React from "react";
import classNames from "classnames";
import { NavItem } from "~/components";
import { ipc } from "~/shared/ipc";

export const NavbarPrint = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <NavItem {...props} className={classNames(props.className)}>
      <span
        className="cursor-pointer nav-link"
        onClick={() => {
          ipc.handlers.PRINT();
        }}
      >
        <i className="fa fa-print"></i>
      </span>
    </NavItem>
  );
};

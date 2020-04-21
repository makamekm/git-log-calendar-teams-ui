import React from "react";
import classNames from "classnames";
import { NavItem } from "~/components";
import { ipc } from "~/shared/ipc";

export const NavbarPrint = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <NavItem
      {...props}
      className={classNames("no-print", "cursor-pointer", props.className)}
      onClick={() => {
        ipc.handlers.PRINT();
      }}
    >
      <span className="navbar-text">
        <i className="fa fa-print"></i>
      </span>
    </NavItem>
  );
};

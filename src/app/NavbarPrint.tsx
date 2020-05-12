import React from "react";
import classNames from "classnames";
import { ipc } from "~/shared/ipc";

export const NavbarPrint = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(className)}
      onClick={() => {
        ipc.handlers.PRINT();
      }}
    >
      <i className="fa fa-print"></i>
    </div>
  );
};

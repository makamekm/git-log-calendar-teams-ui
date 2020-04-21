import React from "react";
import classNames from "classnames";

export const SidebarMobileFluid = ({
  children,
  className,
}: {
  children?: any;
  className?: string;
}) => {
  const wrapClass = classNames("sidebar__mobile-fluid no-print", className);

  return <div className={wrapClass}>{children}</div>;
};

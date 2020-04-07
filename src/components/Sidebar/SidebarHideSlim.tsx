import React from "react";
import classNames from "classnames";

export const SidebarHideSlim = ({ children }: { children?: any }) => {
  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      className: classNames(child.props.className, "sidebar__hide-slim"),
    })
  );
};

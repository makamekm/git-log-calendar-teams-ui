import React from "react";
import classNames from "classnames";

export const SidebarSection = (props: {
  children?: any;
  fluid?: boolean;
  cover?: boolean;
  className?: string;
}) => {
  const sectionClass = classNames(
    "sidebar__section",
    {
      "sidebar__section--fluid": props.fluid,
      "sidebar__section--cover": props.cover,
    },
    props.className
  );

  return <div className={sectionClass}>{props.children}</div>;
};

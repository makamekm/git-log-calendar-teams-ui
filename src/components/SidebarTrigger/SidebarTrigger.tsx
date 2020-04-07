import React from "react";
import { NavLink } from "reactstrap";
import { withLayoutConfig } from "../Layout/LayoutContext";

const SidebarTrigger = withLayoutConfig<
  {
    tag?: any;
    children?: any;
  } & any
>((props) => {
  const { tag: Tag, layoutConfig, ...otherProps } = props;
  return (
    <Tag
      onClick={() => {
        props.layoutConfig.toggleSidebar();
        return false;
      }}
      active={Tag !== "a" ? !layoutConfig.sidebarCollapsed : undefined}
      {...otherProps}
    >
      {props.children}
    </Tag>
  );
});

SidebarTrigger.defaultProps = {
  tag: NavLink,
  children: <i className="fa fa-bars fa-fw"></i>,
};

export { SidebarTrigger };

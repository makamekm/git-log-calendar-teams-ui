import React from "react";
import MediaQuery from "react-responsive";
import { withLayoutConfig } from "../Layout/LayoutContext";

export const SlimOnly = withLayoutConfig<{
  children?: any;
}>((props) => (
  <MediaQuery minWidth={992}>
    {props.layoutConfig.sidebarSlim &&
      props.layoutConfig.sidebarCollapsed &&
      props.children}
  </MediaQuery>
));

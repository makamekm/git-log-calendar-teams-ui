import React from "react";
import MediaQuery from "react-responsive";
import { withLayoutConfig } from "../Layout/LayoutContext";

export const DefaultOnly = withLayoutConfig<{
  children?: any;
}>((props) => (
  <React.Fragment>
    {props.layoutConfig.sidebarSlim && props.layoutConfig.sidebarCollapsed ? (
      <MediaQuery maxWidth={991.8}>{props.children}</MediaQuery>
    ) : (
      props.children
    )}
  </React.Fragment>
));

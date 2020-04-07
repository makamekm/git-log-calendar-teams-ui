import React from "react";
import MatchMedia from "react-responsive";
import { withLayoutConfig } from "../Layout/LayoutContext";

export const SlimProps = withLayoutConfig<{
  children?: any;
  slimProps?: any;
  defaultProps?: any;
}>(({ layoutConfig, children, slimProps }) => {
  return (
    <React.Fragment>
      <MatchMedia minWidth={992}>
        {
          /* If slim is enabled extend the children with slimProps */
          layoutConfig.sidebarSlim && layoutConfig.sidebarCollapsed
            ? React.Children.map(children, (child) =>
                React.cloneElement(child, slimProps)
              )
            : children
        }
      </MatchMedia>
      <MatchMedia maxWidth={991.8}>{children}</MatchMedia>
    </React.Fragment>
  );
});

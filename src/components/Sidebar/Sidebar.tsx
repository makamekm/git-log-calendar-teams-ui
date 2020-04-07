import React from "react";

import { SidebarContent } from "./SidebarContent";
import { withLayoutConfig } from "../Layout/LayoutContext";
import { OuterClick } from "../OuterClick/OuterClick";

export const Sidebar = withLayoutConfig<{
  children?: any;
  slim?: boolean;
  collapsed?: boolean;
  animationsDisabled?: boolean;
}>((props) => (
  <React.Fragment>
    {/* Enable OuterClick only in sidebar overlay mode */}
    <OuterClick
      active={
        !props.layoutConfig.sidebarCollapsed &&
        (props.layoutConfig.screenSize === "xs" ||
          props.layoutConfig.screenSize === "sm" ||
          props.layoutConfig.screenSize === "md")
      }
      onClickOutside={() => props.layoutConfig.toggleSidebar()}
    >
      <SidebarContent {...props} />
    </OuterClick>
  </React.Fragment>
));

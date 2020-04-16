/* eslint-disable no-script-url */
import React from "react";
import {
  Sidebar,
  SidebarTrigger,
  SidebarClose,
  SidebarSection,
  SidebarMobileFluid,
} from "~/components";
import { SidebarTopB } from "~/app/Sidebar/SidebarTopB";
import { SidebarBottomB } from "~/app/Sidebar/SidebarBottomB";
import { SidebarMiddleNav } from "./SidebarMiddleNav";

export const SidebarASidebar = () => (
  <Sidebar>
    {/* START SIDEBAR-OVERLAY: Close (x) */}
    <SidebarClose>
      <SidebarTrigger tag={"a"} href="javascript:;">
        <i className="fa fa-times-circle fa-fw"></i>
      </SidebarTrigger>
    </SidebarClose>
    {/* END SIDEBAR-OVERLAY: Close (x) */}

    {/* START SIDEBAR: Fixed Section */}
    <SidebarSection>
      <SidebarTopB />
    </SidebarSection>
    {/* END SIDEBAR: Fixed Section */}

    {/* START SIDEBAR: Mobile Scroll Wrapper */}
    <SidebarMobileFluid>
      {/* START SIDEBAR: Everywhere */}
      <SidebarSection fluid cover>
        {/* SIDEBAR: Menu */}
        <SidebarMiddleNav />
      </SidebarSection>
      {/* END SIDEBAR: Everywhere */}
      <SidebarBottomB />
    </SidebarMobileFluid>
    {/* END SIDEBAR: Mobile Scroll Wrapper */}
  </Sidebar>
);

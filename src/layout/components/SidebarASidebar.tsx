import React from "react";

import { SidebarMiddleNav } from "./SidebarMiddleNav";

import { SidebarTopB } from "../../routes/components/Sidebar/SidebarTopB";
import { SidebarBottomB } from "../../routes/components/Sidebar/SidebarBottomB";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { SidebarTrigger } from "../../components/SidebarTrigger/SidebarTrigger";
import { SidebarClose } from "../../components/Sidebar/SidebarClose";
import { SidebarSection } from "../../components/Sidebar/SidebarSection";
import { SidebarMobileFluid } from "../../components/Sidebar/SidebarMobileFluid";

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

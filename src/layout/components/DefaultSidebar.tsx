/* eslint-disable no-script-url */
import React from "react";
import { Link } from "react-router-dom";

import { SidebarMiddleNav } from "./SidebarMiddleNav";

import { SidebarTopA } from "../../routes/components/Sidebar/SidebarTopA";
import { SidebarBottomA } from "../../routes/components/Sidebar/SidebarBottomA";
import { LogoThemed } from "../../routes/components/LogoThemed/LogoThemed";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { SidebarTrigger } from "../../components/SidebarTrigger/SidebarTrigger";
import { SidebarClose } from "../../components/Sidebar/SidebarClose";
import { SidebarMobileFluid } from "../../components/Sidebar/SidebarMobileFluid";
import { SidebarHideSlim } from "../../components/Sidebar/SidebarHideSlim";
import { SidebarSection } from "../../components/Sidebar/SidebarSection";

export const DefaultSidebar = () => (
  <Sidebar>
    {/* START SIDEBAR-OVERLAY: Close (x) */}
    <SidebarClose>
      <SidebarTrigger tag={"a"} href="javascript:;">
        <i className="fa fa-times-circle fa-fw"></i>
      </SidebarTrigger>
    </SidebarClose>
    {/* START SIDEBAR-OVERLAY: Close (x) */}

    {/* START SIDEBAR: Only for Desktop */}
    <SidebarHideSlim>
      <SidebarSection>
        <Link to="/" className="sidebar__brand">
          <LogoThemed />
        </Link>
      </SidebarSection>
    </SidebarHideSlim>
    {/* END SIDEBAR: Only for Desktop */}

    {/* START SIDEBAR: Only for Mobile */}
    <SidebarMobileFluid>
      <SidebarTopA />

      <SidebarSection fluid cover>
        {/* SIDEBAR: Menu */}
        <SidebarMiddleNav />
      </SidebarSection>

      <SidebarBottomA />
    </SidebarMobileFluid>
    {/* END SIDEBAR: Only for Mobile */}
  </Sidebar>
);

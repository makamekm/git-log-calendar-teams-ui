/* eslint-disable no-script-url */
import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarTrigger,
  SidebarMobileFluid,
  SidebarClose,
  SidebarHideSlim,
  SidebarSection,
} from "~/components";
import { SidebarTopA } from "~/app/Sidebar/SidebarTopA";
import { SidebarBottomA } from "~/app/Sidebar/SidebarBottomA";
import { LogoThemed } from "~/app/LogoThemed/LogoThemed";
import { SidebarMiddleNav } from "./SidebarMiddleNav";

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

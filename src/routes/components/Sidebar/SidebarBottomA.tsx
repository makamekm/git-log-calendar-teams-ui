import React from "react";

import { FooterAuth } from "../Pages/FooterAuth";
import { FooterText } from "../FooterText";
import { VersionSelector } from "../VersionSelector";
import { SidebarHideSlim } from "../../../components/Sidebar/SidebarHideSlim";
import { SidebarSection } from "../../../components/Sidebar/SidebarSection";
import { SidebarShowSlim } from "../../../components/Sidebar/SidebarShowSlim";
import { Button, UncontrolledPopover, PopoverBody } from "reactstrap";

const SidebarBottomA = () => (
  <>
    {/* START Desktop */}
    <SidebarHideSlim>
      <SidebarSection className="pb-0">
        <VersionSelector sidebar dashboard="Airframe" />
      </SidebarSection>
      <SidebarSection>
        <FooterAuth className="text-muted" />
      </SidebarSection>
    </SidebarHideSlim>
    {/* END Desktop */}

    {/* START Slim Only */}
    <SidebarShowSlim>
      <SidebarSection className="text-center">
        {/* Slim Version Selector */}
        <VersionSelector
          dashboard="Airframe"
          sidebar
          compact
          render={() => <i className="fa fa-fw fa-toggle-on"></i>}
        />

        {/* Footer Text as Tooltip */}
        <Button
          id="UncontrolledSidebarPopoverFooter"
          color="link"
          className="sidebar__link p-0 mt-3"
        >
          <i className="fa fa-fw fa-question-circle-o"></i>
        </Button>
        <UncontrolledPopover
          placement="left-end"
          target="UncontrolledSidebarPopoverFooter"
        >
          <PopoverBody>
            <FooterText />
          </PopoverBody>
        </UncontrolledPopover>
      </SidebarSection>
    </SidebarShowSlim>
    {/* END Slim Only */}
  </>
);

export { SidebarBottomA };

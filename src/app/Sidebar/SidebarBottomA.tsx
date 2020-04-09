import React from "react";
import {
  Button,
  UncontrolledPopover,
  PopoverBody,
  SidebarHideSlim,
  SidebarSection,
  SidebarShowSlim,
} from "~/components";
import { FooterAuth } from "../Pages/FooterAuth";
import { FooterText } from "../FooterText";

const SidebarBottomA = () => (
  <>
    {/* START Desktop */}
    <SidebarHideSlim>
      <SidebarSection>
        <FooterAuth className="text-muted" />
      </SidebarSection>
    </SidebarHideSlim>
    {/* END Desktop */}

    {/* START Slim Only */}
    <SidebarShowSlim>
      <SidebarSection className="text-center">
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

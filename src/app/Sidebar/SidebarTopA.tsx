import React from "react";
import {
  SidebarSection,
  SidebarShowSlim,
  UncontrolledTooltip,
} from "~/components";
import { Link } from "react-router-dom";

const SidebarTopA = () => (
  <React.Fragment>
    {/* START: Sidebar Slim */}
    <SidebarShowSlim>
      <SidebarSection>
        <div className="text-center">
          <Link to="/">
            <i
              className="fa fa-git fa-fw text-primary"
              id="tooltipBackToHomeSlim"
            ></i>
          </Link>
          <UncontrolledTooltip placement="right" target="tooltipBackToHomeSlim">
            Back to Home
          </UncontrolledTooltip>
        </div>
      </SidebarSection>
    </SidebarShowSlim>
    {/* END: Sidebar Slim */}
  </React.Fragment>
);

export { SidebarTopA };

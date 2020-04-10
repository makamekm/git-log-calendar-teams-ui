import React from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledTooltip,
  SidebarHideSlim,
  SidebarShowSlim,
} from "~/components";

const SidebarTopB = () => (
  <React.Fragment>
    {/* START Sidebar TOP: B */}
    {/* START DESKTOP View */}
    <SidebarHideSlim>
      <div>
        <div className="d-flex">
          <Link
            to="/"
            className="align-self-center sidebar__brand"
            id="tooltipBackToHome"
          >
            <i className="fa fa-git fa-fw fa-2x"></i>
            <strong className="pb-2">STATS MANAGER</strong>
          </Link>
          <UncontrolledTooltip placement="right" target="tooltipBackToHome">
            Back to Home
          </UncontrolledTooltip>
        </div>
      </div>
    </SidebarHideSlim>
    {/* END DESKTOP View */}

    {/* START SLIM Only View */}
    <SidebarShowSlim>
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
    </SidebarShowSlim>
    {/* END SLIM Only View  */}
    {/* END Sidebar TOP: B */}
  </React.Fragment>
);

export { SidebarTopB };

import React from "react";
import { Link } from "react-router-dom";
import { UncontrolledTooltip, SidebarHideSlim, SidebarShowSlim } from "@lib";
import { VersionSelector } from "../VersionSelector";

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
            <i className="fa fa-send fa-fw fa-2x"></i>
          </Link>
          <UncontrolledTooltip placement="right" target="tooltipBackToHome">
            Back to Home
          </UncontrolledTooltip>

          <VersionSelector
            down
            sidebar
            dashboard="Airframe"
            render={(currentVersion) => (
              <React.Fragment>
                <div className="h4 fw-600 sidebar-logo mb-1 text-left">
                  react.bs4{" "}
                  <i className="fa fa-angle-down ml-1 sidebar__link--muted"></i>
                </div>
                <div className="job-title small text-left sidebar__link--muted">
                  Version: {currentVersion.label}, {currentVersion.version}
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    </SidebarHideSlim>
    {/* END DESKTOP View */}
    {/* START SLIM Only View */}
    <SidebarShowSlim>
      <div className="text-center">
        <Link to="/">
          <i
            className="fa fa-send fa-fw text-primary"
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

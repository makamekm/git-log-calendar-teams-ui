import React from "react";
import faker from "faker/locale/en_US";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  Media,
  Button,
  UncontrolledPopover,
  PopoverBody,
  AvatarImage,
  AvatarAddonIcon,
  SidebarShowSlim,
  SidebarHideSlim,
  SidebarSection,
} from "~/components";
import { randomAvatar } from "~/utilities";
import { FooterPanel } from "~/app/FooterPanel";
import { FooterText } from "~/app/FooterText";
import { DropdownProfile } from "~/wip/Dropdowns/DropdownProfile";

const SidebarBottomB = () => (
  <>
    {/* START Sidebar BOTTOM: B */}
    <SidebarSection>
      {/* START DESKTOP View */}
      <SidebarHideSlim>
        <UncontrolledButtonDropdown direction="up" className="mb-3">
          <DropdownToggle
            color="link"
            className="btn-profile text-left pl-0 pb-0"
          >
            <Media>
              <Media left middle className="mr-3">
                <AvatarImage
                  size="md"
                  src={randomAvatar()}
                  addOns={[
                    <AvatarAddonIcon
                      className="fa fa-circle"
                      color="white"
                      key="avatar-icon-bg"
                    />,
                    <AvatarAddonIcon
                      className="fa fa-circle"
                      color="success"
                      key="avatar-icon-fg"
                    />,
                  ]}
                />
              </Media>
              <Media body>
                <span className="mt-0 d-flex h6 mb-1 text-truncate">
                  {faker.name.firstName()} {faker.name.lastName()}{" "}
                  <i className="fa fa-fw fa-angle-up ml-1"></i>
                </span>
                <p className="small text-truncate">{faker.name.jobTitle()}</p>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownProfile />
        </UncontrolledButtonDropdown>
      </SidebarHideSlim>
      {/* END DESKTOP View */}
      {/* START SLIM Only View */}
      <SidebarShowSlim>
        <div className="text-center">
          <UncontrolledButtonDropdown direction="right" className="mb-3">
            <DropdownToggle color="link" className="text-left pl-0 pb-0">
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="success"
                    key="avatar-icon-fg"
                  />,
                ]}
              />
            </DropdownToggle>
            <DropdownProfile />
          </UncontrolledButtonDropdown>
        </div>
      </SidebarShowSlim>
      {/* END SLIM Only View  */}
      {/* START DESKTOP View */}
      <SidebarHideSlim>
        <FooterPanel />
      </SidebarHideSlim>
      {/* END DESKTOP View */}
      {/* START SLIM Only View */}
      <SidebarShowSlim>
        <div className="text-center">
          <Button
            color="link"
            id="UncontrolledSidebarPopoverFooter"
            className="sidebar__link p-0"
          >
            <i className="fa fa-fw fa-question-circle-o" />
          </Button>
          <UncontrolledPopover
            placement="left-end"
            target="UncontrolledSidebarPopoverFooter"
          >
            <PopoverBody>
              <FooterText />
            </PopoverBody>
          </UncontrolledPopover>
        </div>
      </SidebarShowSlim>
      {/* END SLIM Only View */}
    </SidebarSection>
    {/* END Sidebar BOTTOM: B */}
  </>
);

export { SidebarBottomB };

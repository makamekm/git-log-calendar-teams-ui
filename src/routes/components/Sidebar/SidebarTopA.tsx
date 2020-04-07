import React from "react";
import faker from "faker/locale/en_US";
import { Link } from "react-router-dom";

import { randomAvatar } from "../../../utilities";
import { SidebarHideSlim } from "../../../components/Sidebar/SidebarHideSlim";
import { SidebarSection } from "../../../components/Sidebar/SidebarSection";
import { AvatarImage } from "../../../components/Avatar/AvatarImage";
import { AvatarAddonIcon } from "../../../components/Avatar/AvatarAddonIcon";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { SidebarShowSlim } from "../../../components/Sidebar/SidebarShowSlim";

const avatarImg = randomAvatar();

const SidebarTopA = () => (
  <React.Fragment>
    {/* START: Sidebar Default */}
    <SidebarHideSlim>
      <SidebarSection className="pt-0">
        <Link to="/" className="d-block">
          <SidebarHideSlim>
            <AvatarImage
              size="lg"
              src={avatarImg}
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
          </SidebarHideSlim>
        </Link>

        <UncontrolledButtonDropdown>
          <DropdownToggle
            color="link"
            className="pl-0 pb-0 btn-profile sidebar__link"
          >
            {faker.name.firstName()} {faker.name.lastName()}
            <i className="fa fa-angle-down ml-2"></i>
          </DropdownToggle>
          <DropdownMenu persist>
            <DropdownItem header>
              {faker.name.firstName()} {faker.name.lastName()}
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to="/apps/profile-details">
              My Profile
            </DropdownItem>
            <DropdownItem tag={Link} to="/apps/settings-edit">
              Settings
            </DropdownItem>
            <DropdownItem tag={Link} to="/apps/billing-edit">
              Billings
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to="/pages/login">
              <i className="fa fa-fw fa-sign-out mr-2"></i>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <div className="small sidebar__link--muted">
          {faker.name.jobTitle()}
        </div>
      </SidebarSection>
    </SidebarHideSlim>
    {/* END: Sidebar Default */}

    {/* START: Sidebar Slim */}
    <SidebarShowSlim>
      <SidebarSection>
        <AvatarImage
          size="sm"
          src={avatarImg}
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
      </SidebarSection>
    </SidebarShowSlim>
    {/* END: Sidebar Slim */}
  </React.Fragment>
);

export { SidebarTopA };

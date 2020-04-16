import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarToggler,
  UncontrolledDropdown,
  AvatarAddonIcon,
  AvatarImage,
} from "~/components";
import { randomAvatar } from "~/utilities";
import { NavbarActivityFeed } from "~/layout/NavbarActivityFeed";
import { NavbarMessages } from "~/layout/NavbarMessages";
import { NavbarUser } from "~/layout/NavbarUser";
import { DropdownProfile } from "~/wip/Dropdowns/DropdownProfile";
import { NavbarNavigation } from "~/wip/Interface/Navbars/NavbarNavigation";
import { LogoThemed } from "~/app/LogoThemed";

export const LayoutNavbar = () => (
  <React.Fragment>
    <Navbar light expand="lg" themed>
      <Link to="/" className="navbar-brand mr-0 mr-sm-3">
        <LogoThemed className="mb-1" />
      </Link>

      <Nav pills>
        <NavItem>
          <NavLink
            tag={NavbarToggler}
            id="navbar-navigation-toggler"
            className="b-0"
          >
            <i className="fa fa-fw fa-bars"></i>
          </NavLink>
        </NavItem>
      </Nav>

      {/* Navigation with Collapse */}
      <NavbarNavigation pills />

      {/* END Navbar: Left Side */}
      {/* START Navbar: Right Side */}
      <Nav className="ml-auto" pills>
        <NavbarMessages />
        <NavbarActivityFeed />
        {/* START Navbar: Dropdown */}
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav>
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
                  color="danger"
                  key="avatar-icon-fg"
                />,
              ]}
            />
          </DropdownToggle>
          <DropdownProfile right />
        </UncontrolledDropdown>
        {/* END Navbar: Dropdown */}
        <NavbarUser className="d-none d-lg-block" />
      </Nav>
      {/* END Navbar: Right Side */}
    </Navbar>

    <Navbar light shadow expand="lg" className="py-3 bg-white">
      <h1 className="mb-0 h4">Navbar Only</h1>
      <Button className="px-4 my-sm-0">
        Download <i className="fa ml-1 fa-fw fa-download"></i>
      </Button>
    </Navbar>
  </React.Fragment>
);

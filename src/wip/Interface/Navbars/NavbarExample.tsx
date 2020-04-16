import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  UncontrolledCollapse,
  UncontrolledDropdown,
  AvatarAddonIcon,
  AvatarImage,
} from "~/components";
import { randomAvatar } from "~/utilities";
import { NavbarActivityFeed } from "~/layout/NavbarActivityFeed";
import { NavbarMessages } from "~/layout/NavbarMessages";
import { NavbarUser } from "~/layout/NavbarUser";
import { NavbarNavigation } from "./NavbarNavigation";
import { DropdownProfile } from "../../Dropdowns/DropdownProfile";

const NavbarExample = ({
  themeColor,
  navStyle,
}: {
  navStyle?: "pills" | "accent" | "default";
  themeColor?: string;
}) => {
  return (
    <div className="shadow-sm">
      <Navbar expand="lg" themed>
        <Link to="/">
          <NavbarBrand className="mb-0" tag="div">
            react.bs4
          </NavbarBrand>
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
        <UncontrolledCollapse navbar toggler="#navbar-navigation-toggler">
          <NavbarNavigation
            pills={navStyle === "pills"}
            accent={navStyle === "accent"}
          />
        </UncontrolledCollapse>

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

      <Navbar light expand="lg" className="py-3 bg-white">
        <h1 className="mb-0 h4">Navbar Only</h1>

        <Button color={themeColor} className="px-4 my-sm-0">
          Download <i className="fa ml-1 fa-fw fa-download"></i>
        </Button>
      </Navbar>
    </div>
  );
};

NavbarExample.defaultProps = {
  navStyle: "default",
  themeColor: "primary",
};

export { NavbarExample };

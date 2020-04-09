import React from "react";
import { Link } from "react-router-dom";
import { SidebarTrigger, Navbar, Nav, NavItem } from "~/components";
import { LogoThemed } from "~/app/LogoThemed/LogoThemed";
import { NavbarActivityFeed } from "./NavbarActivityFeed";
import { NavbarMessages } from "./NavbarMessages";
import { NavbarUser } from "./NavbarUser";

export const DefaultNavbar = () => (
  <Navbar light expand="xs" fluid>
    <Nav navbar>
      <NavItem className="mr-3">
        <SidebarTrigger />
      </NavItem>
      <NavItem className="navbar-brand d-lg-none">
        <Link to="/" className="nav-logo">
          <LogoThemed />
        </Link>
      </NavItem>
      <NavItem className="d-none d-md-block">
        <span className="navbar-text">
          <Link to="/">
            <i className="fa fa-home"></i>
          </Link>
        </span>
        <span className="navbar-text px-2">
          <i className="fa fa-angle-right"></i>
        </span>
        <span className="navbar-text">
          <Link to="/">Start</Link>
        </span>
        <span className="navbar-text px-2">
          <i className="fa fa-angle-right"></i>
        </span>
        <span className="navbar-text">Page Link</span>
      </NavItem>
    </Nav>
    <Nav navbar className="ml-auto">
      <NavbarActivityFeed />
      <NavbarMessages className="ml-2" />
      <NavbarUser className="ml-2" />
    </Nav>
  </Navbar>
);

import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  SidebarTrigger,
  Navbar,
  Nav,
  NavItem,
  LayoutContext,
} from "~/components";
import { LogoThemed } from "~/app/LogoThemed";
// import { NavbarActivityFeed } from "./NavbarActivityFeed";
// import { NavbarMessages } from "./NavbarMessages";
import { NavbarUser } from "./NavbarUser";
import { NavbarPrint } from "./NavbarPrint";
import { SearchBar } from "~/app/SearchBar/SearchBar";
import { NavbarCollect } from "./NavbarCollect";

export const DefaultNavbar = () => {
  const context = React.useContext(LayoutContext);
  return (
    <Navbar light expand="xs" fluid>
      <Nav navbar className="text-nowrap" style={{ flexWrap: "unset" }}>
        {!context.sidebarHidden && (
          <NavItem className="mr-3">
            <SidebarTrigger />
          </NavItem>
        )}
        <NavItem
          className={classNames("navbar-brand", {
            "d-lg-none": !context.sidebarHidden,
          })}
        >
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
          {context.breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <span className="navbar-text px-2">
                <i className="fa fa-angle-right"></i>
              </span>
              {breadcrumb.url ? (
                <span className="navbar-text">
                  <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
                </span>
              ) : (
                <span className="navbar-text">{breadcrumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </NavItem>
      </Nav>
      <SearchBar />
      <Nav
        navbar
        className="no-print text-nowrap"
        style={{ flexWrap: "unset" }}
      >
        {/* <NavbarActivityFeed />
        <NavbarMessages className="ml-2" /> */}
        <NavbarCollect />
        <NavbarPrint className="ml-2" />
        <NavbarUser className="ml-2" />
      </Nav>
    </Navbar>
  );
};

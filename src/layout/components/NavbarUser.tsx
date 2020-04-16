import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "~/components";
import { getEncapsulatedPath } from "~/app/Auth/AuthService";

const NavbarUser = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { pathname } = useLocation();
  return (
    <NavItem {...props}>
      <NavLink tag={Link} to={"/logout/" + getEncapsulatedPath(pathname)}>
        <i className="fa fa-power-off"></i>
      </NavLink>
    </NavItem>
  );
};

export { NavbarUser };

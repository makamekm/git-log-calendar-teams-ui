import React from "react";
import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

const NavbarUser = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <NavItem {...props}>
    <NavLink tag={Link} to="/pages/login">
      <i className="fa fa-power-off"></i>
    </NavLink>
  </NavItem>
);

export { NavbarUser };

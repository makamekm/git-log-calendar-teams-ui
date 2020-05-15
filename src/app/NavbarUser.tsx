import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getEncapsulatedPath } from "./Auth/AuthService";

const NavbarUser = ({ className }: { className?: string }) => {
  const { pathname } = useLocation();
  return (
    <Link className={className} to={"/logout/" + getEncapsulatedPath(pathname)}>
      <i className="fa fa-power-off"></i>
    </Link>
  );
};

export { NavbarUser };

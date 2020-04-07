import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Nav } from "../../../components/Nav/Nav";
import { NavItem, NavLink } from "reactstrap";

const ProfileLeftNav = () => (
  <React.Fragment>
    {/* START Left Nav  */}
    <div className="mb-4">
      <Nav pills vertical>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/apps/profile-edit">
            Profile Edit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/apps/account-edit">
            Account Edit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/apps/billing-edit">
            Billing Edit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/apps/settings-edit">
            Settings Edit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/apps/sessions-edit">
            Sessions Edit
          </NavLink>
        </NavItem>
      </Nav>
    </div>
    {/* END Left Nav  */}
  </React.Fragment>
);

export { ProfileLeftNav };

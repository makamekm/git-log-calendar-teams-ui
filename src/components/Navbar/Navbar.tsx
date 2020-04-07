import React from "react";
import classNames from "classnames";
import { Navbar as BSNavbar, NavbarProps, Container } from "reactstrap";

const Navbar = ({
  themed,
  fluid,
  shadow,
  className,
  children,
  dark,
  light,
  color,
  ...otherProps
}: NavbarProps & {
  themed?: boolean;
  fluid?: boolean;
  shadow?: boolean;
  className?: string;
  children?: any;
  color?: string;
  dark?: boolean;
  light?: boolean;
}) => {
  let navbarClass = classNames(
    {
      "navbar-themed": themed || !!color,
      "navbar-shadow": shadow,
    },
    "navbar-multi-collapse",
    className
  );

  // When a combination of light or dark is present
  // with a color - use a custom class instead of bootstrap's
  if ((dark || light) && color) {
    navbarClass = classNames(
      navbarClass,
      `navbar-${light ? "light" : ""}${dark ? "dark" : ""}-${color}`
    );
  }

  return (
    <BSNavbar
      className={navbarClass}
      /*
                Use the dark and light switches
                only when color is not set
            */
      dark={dark && !color}
      light={light && !color}
      {...otherProps}
    >
      {
        <Container className="navbar-collapse-wrap" fluid={fluid}>
          {children}
        </Container>
      }
    </BSNavbar>
  );
};

Navbar.defaultProps = {
  fluid: false,
  themed: false,
};

export { Navbar };

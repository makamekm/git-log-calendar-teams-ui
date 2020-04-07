import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { DropdownContext } from "reactstrap/es/DropdownContext";

const ExtendedDropdownLink = (props: LinkProps) => {
  const { children, ...otherProps } = props;

  return (
    <DropdownContext.Consumer>
      {({ toggle }) => (
        <Link
          {...otherProps}
          onClick={() => {
            toggle();
          }}
        >
          {children}
        </Link>
      )}
    </DropdownContext.Consumer>
  );
};

ExtendedDropdownLink.defaultProps = { ...(Link as any).defaultProps };

export { ExtendedDropdownLink };

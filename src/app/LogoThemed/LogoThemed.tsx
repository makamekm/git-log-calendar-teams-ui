import React from "react";
import classNames from "classnames";

export const LogoThemed = ({
  className,
  ...otherProps
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => (
  <img
    height={15}
    src={require("~/images/logos/logo-primary.png")}
    className={classNames("d-block", className)}
    alt="Program Logo"
    {...otherProps}
  />
);

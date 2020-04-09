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
    src={require("./../../../images/logos/logo-primary.svg")}
    className={classNames("d-block", className)}
    alt="Airframe Logo"
    {...otherProps}
  />
);

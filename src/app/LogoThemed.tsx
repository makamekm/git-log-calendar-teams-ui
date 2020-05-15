import React from "react";
import classNames from "classnames";

export const LogoThemed = ({
  className,
  titleClassName,
  small,
}: {
  className?: string;
  titleClassName?: string;
  small?: string;
}) => (
  <span className={classNames("ellipsis", className)}>
    <i className="fab fa-git fa-fw fa-lg"></i>
    {!small && (
      <sub className={titleClassName}>
        <strong>STATS MANAGER</strong>
      </sub>
    )}
  </span>
);

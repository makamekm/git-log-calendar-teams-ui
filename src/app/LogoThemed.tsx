import React from "react";

export const LogoThemed = ({
  className,
  ...otherProps
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => (
  <span className="align-self-center sidebar__brand">
    <i className="fab fa-git fa-fw fa-lg"></i>
    <sub>
      <strong>STATS MANAGER</strong>
    </sub>
  </span>
);

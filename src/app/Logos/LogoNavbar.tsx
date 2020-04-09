import React from "react";

const LogoNavbar = (props: { logo?: string }) => (
  <React.Fragment>
    {/* START Logo: Visible on: md, lg, xl */}
    <i className={` fa fa-lg fa-fw d-none d-lg-block fa-${props.logo}`}></i>
    {/* END Logo: Visible on: md, lg, xl */}
    {/* START Logo: Visible on: xs, sm */}
    <i className={` fa fa-fw d-lg-none fa-${props.logo}`}></i>
    {/* END Logo: Visible on: xs, sm */}
  </React.Fragment>
);

LogoNavbar.defaultProps = {
  logo: "send",
};

export { LogoNavbar };

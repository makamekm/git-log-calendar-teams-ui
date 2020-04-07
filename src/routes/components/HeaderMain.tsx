import React from "react";

const HeaderMain = (props: {
  title?: string;
  subTitle?: any;
  className?: string;
}) => (
  <React.Fragment>
    {/* START H1 Header */}
    <div className={` d-flex ${props.className}`}>
      <h1 className="display-4 mr-3 mb-0 align-self-start">{props.title}</h1>
    </div>
    {/* END H1 Header */}
  </React.Fragment>
);
HeaderMain.defaultProps = {
  title: "Waiting for Data...",
  subTitle: "Waiting for Data...",
  className: "my-4",
};

export { HeaderMain };

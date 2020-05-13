import React from "react";
import classNames from "classnames";

const HeaderMain = ({
  subTitle,
  title,
  className,
}: {
  title?: any;
  subTitle?: any;
  className?: string;
}) => (
  <React.Fragment>
    {/* START H1 Header */}
    <div className={classNames("text-5xl font-light text-gray-900", className)}>
      {title} {subTitle && <span className="text-xs">{subTitle}</span>}
    </div>
    {/* END H1 Header */}
  </React.Fragment>
);

HeaderMain.defaultProps = {
  title: "",
  subTitle: "",
  className: "",
};

export { HeaderMain };

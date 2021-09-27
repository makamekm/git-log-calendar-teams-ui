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
    <div
      className={classNames(
        "no-print-break no-print-break-after text-5xl font-light text-gray-900 dark-mode:text-gray-300",
        className
      )}
    >
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

import React from "react";
import classNames from "classnames";

const HeaderSection = ({
  no,
  title,
  subTitle,
  children,
  className,
}: {
  no?: string | number;
  title?: string;
  subTitle?: any;
  children?: any;
  className?: string;
}) => (
  <div
    className={classNames(
      "no-print-break no-print-break-after flex items-center text-5xl font-light",
      className
    )}
  >
    <div>
      <div className="mr-3 display-4 text-muted">{no}.</div>
    </div>
    {(title || children || subTitle) && (
      <div className="text-xl">
        <h4 className="mt-1 text-gray-900 dark-mode:text-gray-300">{title}</h4>
        {(children || subTitle) && (
          <div className="text-sm">{children || subTitle}</div>
        )}
      </div>
    )}
  </div>
);

HeaderSection.defaultProps = {
  no: 0,
  title: "",
};

export { HeaderSection };

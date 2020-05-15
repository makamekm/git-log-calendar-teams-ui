import React from "react";
import classNames from "classnames";
import { periods } from "./Periods";
import { numberWithCommas } from "~/tools";

export const TotalCommitsPanel = ({
  valueToday,
  valueLimited,
  limit,
  className,
}: {
  className?: string;
  valueToday: number;
  valueLimited: number;
  limit: number;
}) => {
  return (
    <div className={classNames("no-print-break", className)}>
      <div className="hr-text hr-text-center my-2">
        <span>Commits</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <div className="text-center text-gray-800 dark-mode:text-gray-400">
            <i className="fa fa-circle color-blue mr-2"></i>
            Today
          </div>
          <div className="mt-2 text-2xl text-gray-900 dark-mode:text-gray-300">
            {numberWithCommas(valueToday)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-center text-gray-800 dark-mode:text-gray-400">
            <i className="fa fa-circle color-cyan mr-2"></i>
            {periods[limit]}
          </div>
          <div className="mt-2 text-2xl text-gray-900 dark-mode:text-gray-300">
            {numberWithCommas(valueLimited)}
          </div>
        </div>
      </div>
    </div>
  );
};

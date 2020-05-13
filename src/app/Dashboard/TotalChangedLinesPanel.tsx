import React from "react";
import { periods } from "./Periods";
import { numberWithCommas } from "~/tools";

export const TotalChangedLinesPanel = ({
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
    <div className={className}>
      <div className="hr-text hr-text-center mb-2 mt-3">
        <span>Line Changes</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <div className="text-center text-gray-800">
            <i className="fa fa-circle text-warning mr-2"></i>
            Today
          </div>
          <div className="mt-2 text-2xl text-gray-900">
            {numberWithCommas(valueToday)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-center text-gray-800">
            <i className="fa fa-circle text-danger mr-2"></i>
            {periods[limit]}
          </div>
          <div className="mt-2 text-2xl text-gray-900">
            {numberWithCommas(valueLimited)}
          </div>
        </div>
      </div>
    </div>
  );
};

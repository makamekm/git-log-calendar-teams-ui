import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { TinyDonutChart } from "./TinyDonutChart";
import { numberWithCommas } from "~/tools";

const colors = ["green", "blue", "yellow", "cyan", "purple"];

export const TopPanel = ({
  data,
  colorShift,
  name,
  className,
  type,
}: {
  className?: string;
  type: string;
  name?: string;
  colorShift?: number;
  data: { name: string; value: number }[];
}) => {
  return data ? (
    <div className={classNames("no-print-break", className)}>
      <div className={"hr-text hr-text-left mb-3"}>
        <span>
          Top {data.length} {name}
        </span>
      </div>
      {data.length === 0 && (
        <div className="flex items-center justify-center">
          <code>
            {"<"} No Data {">"}
          </code>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex">
          <div className="mr-3">
            <TinyDonutChart
              colors={colors}
              data={data}
              colorShift={colorShift}
            />
          </div>
          <div>
            {data.map((entry, index) => (
              <div key={index} className="text-gray-700">
                <Link to={`/${type}/${entry.name}`} className="text-secondary">
                  <i
                    className={`fa fa-circle mr-1 color-${
                      colors[(index + (colorShift || 0)) % colors.length]
                    }`}
                  ></i>
                  <span className="text-inverse">
                    {numberWithCommas(entry.value)}
                  </span>{" "}
                  {entry.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : null;
};

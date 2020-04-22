import React from "react";
import { Link } from "react-router-dom";
import { Media } from "~/components";
import { TinyDonutChart } from "./TinyDonutChart";
import { numberWithCommas } from "~/tools";

const colors = ["success", "primary", "yellow", "info", "purple"];

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
    <div className={className}>
      <div className={"hr-text hr-text-left mb-3"}>
        <span>
          Top {data.length} {name}
        </span>
      </div>
      {data.length === 0 && (
        <div className="d-flex align-items-center justify-content-center">
          <code>
            {"<"} No Data {">"}
          </code>
        </div>
      )}
      {data.length > 0 && (
        <Media>
          <Media left className="mr-3">
            <TinyDonutChart
              colors={colors}
              data={data}
              colorShift={colorShift}
            />
          </Media>
          <Media body>
            {data.map((entry, index) => (
              <div key={index}>
                <Link to={`/${type}/${entry.name}`} className="text-secondary">
                  <i
                    className={`fa fa-circle mr-1 text-${
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
          </Media>
        </Media>
      )}
    </div>
  ) : null;
};

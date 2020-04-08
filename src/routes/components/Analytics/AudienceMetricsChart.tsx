import React from "react";
import _ from "lodash";
import moment from "moment";

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  Bar,
} from "recharts";

import colors from "../../../colors";

const CHART_LENGTH = 30;
const CHART_START_DATE = moment().subtract(CHART_LENGTH, "months");

const dataGenerator = (index) => {
  const referenceValue = _.random(1500, 1800);
  const halfedRefVal = referenceValue / 2;

  return {
    key: index,
    month: moment(CHART_START_DATE).add(index, "months").format("MMM YY"),
    Tokyo: referenceValue,
    "New York": _.random(1200, 2200),
    Berlin: referenceValue - _.random(halfedRefVal, halfedRefVal * 1.1),
  };
};

const data = _.times(CHART_LENGTH, dataGenerator);

export const AudienceMetricsChart = ({
  height,
  className,
}: {
  height: string;
  className: string;
}) => (
  <ResponsiveContainer
    width="100%"
    minHeight="250px"
    className={className}
    {...(!_.isUndefined(height)
      ? {
          height,
        }
      : {
          aspect: 2 / 1,
        })}
  >
    <ComposedChart
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <XAxis
        dataKey="month"
        tickLine={{
          fill: colors["500"],
          strokeWidth: 1,
        }}
        axisLine={{
          fill: colors["500"],
          strokeWidth: 1,
        }}
        tick={{
          fontSize: "12px",
          fill: colors["900"],
        }}
      />
      <YAxis
        tickLine={{
          fill: colors["500"],
          strokeWidth: 1,
        }}
        axisLine={{
          fill: colors["500"],
          strokeWidth: 1,
        }}
        tick={{
          fontSize: "12px",
          fill: colors["900"],
        }}
      />
      <CartesianGrid
        stroke={colors["200"]}
        strokeDasharray="none"
        vertical={false}
        strokeWidth={1}
      />
      <Tooltip
        cursorStyle={{
          fill: colors["primary-01"],
        }}
        contentStyle={{
          background: colors["900"],
          border: `1px solid ${colors["900"]}`,
          color: colors["white"],
        }}
      />
      <Legend
        wrapperStyle={{
          color: colors["900"],
        }}
      />
      <Bar dataKey="New York" barSize={5} fill={colors["400"]} />
      <Area
        dataKey="Tokyo"
        fill={colors["purple-02"]}
        stroke={colors["purple"]}
        activeDot={null}
      />
      <Area
        dataKey="Berlin"
        fill={colors["primary-04"]}
        stroke={colors["primary"]}
        activeDot={{ r: 5 }}
        dot={{
          fill: colors["primary"],
          stroke: colors["white"],
          strokeWidth: 2,
          r: 5,
        }}
      />
    </ComposedChart>
  </ResponsiveContainer>
);

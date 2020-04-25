import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Brush,
  Bar,
} from "recharts";
import colors from "~/colors";

export const BarActivities = ({
  height,
  className,
  data,
}: {
  height?: number;
  className?: string;
  data: {
    day: string;
    value: number;
  }[];
}) => {
  return (
    <ResponsiveContainer width="100%" minHeight={height} className={className}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          stroke={colors["200"]}
          strokeDasharray="none"
          vertical={false}
          strokeWidth={1}
        />
        <XAxis
          dataKey="day"
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
        <Tooltip />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="day" height={30} stroke={colors["success"]} />
        <Bar dataKey="value" fill={colors["success"]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

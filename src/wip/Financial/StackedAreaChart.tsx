import React from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import colors from "~/colors";

const data = [
  { name: "Mon", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Tue", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Wed", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Thu", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Fri", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Sat", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Sun", uv: 3490, pv: 4300, amt: 2100 },
];

const StackedAreaChart = () => (
  <ResponsiveContainer width="100%" aspect={6.0 / 3.0}>
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
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
      <Area
        dataKey="uv"
        stackId="1"
        stroke={colors["purple"]}
        fill={colors["purple-04"]}
        dot={{
          strokeOpacity: 1,
          strokeWidth: 2,
          fillOpacity: 1,
          width: 5,
          height: 5,
          stroke: colors["purple"],
          fill: colors["purple"],
        }}
        activeDot={{
          strokeOpacity: 1,
          strokeWidth: 2,
          fillOpacity: 1,
          width: 7,
          height: 7,
          stroke: colors["purple"],
          fill: colors["purple"],
        }}
      />
      <Area
        dataKey="pv"
        stackId="1"
        stroke={colors["primary"]}
        fill={colors["primary-04"]}
        dot={{
          strokeOpacity: 1,
          strokeWidth: 2,
          fillOpacity: 1,
          width: 5,
          height: 5,
          stroke: colors["primary"],
          fill: colors["primary"],
        }}
        activeDot={{
          strokeOpacity: 1,
          strokeWidth: 2,
          fillOpacity: 1,
          width: 7,
          height: 7,
          stroke: colors["primary"],
          fill: colors["primary"],
        }}
      />
      <Area
        dataKey="amt"
        stackId="1"
        stroke={colors["success"]}
        fill={colors["success-04"]}
        dot={{
          r: 5 / 2,
          stroke: colors["success"],
          fill: colors["success"],
          strokeWidth: 2,
          strokeOpacity: 1,
          fillOpacity: 1,
        }}
        activeDot={{
          r: 7 / 2,
          stroke: colors["success"],
          fill: colors["success"],
          strokeWidth: 2,
          strokeOpacity: 1,
          fillOpacity: 1,
        }}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export { StackedAreaChart };

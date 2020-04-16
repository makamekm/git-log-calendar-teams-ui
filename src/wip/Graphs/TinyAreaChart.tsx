import React from "react";
import _ from "lodash";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import colors from "~/colors";

const data = _.times(20, () => ({ pv: Math.random() * 100 }));

/* 99% - some wierd HACK that makes the container resize properly */
const TinyAreaChart = () => (
  <ResponsiveContainer width="99%" height={40}>
    <AreaChart
      data={data}
      margin={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Area
        dataKey="pv"
        stroke={colors["primary"]}
        fill={colors["primary-04"]}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export { TinyAreaChart };
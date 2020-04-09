import React from "react";
import _ from "lodash";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import colors from "~/colors";

const data = _.times(20, () => ({ pv: Math.random() * 100 }));

const TinyLineChart = () => (
  <ResponsiveContainer width="100%" height={40}>
    <LineChart data={data}>
      <Line
        dataKey="pv"
        stroke={colors["primary-07"]}
        strokeWidth={2}
        activeDot={{ r: 5 }}
        dot={{
          fill: colors["primary-07"],
          stroke: colors["white"],
        }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export { TinyLineChart };

import React from "react";
import _ from "lodash";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import colors from "~/colors";

const data = _.times(20, () => ({ pv: Math.random() * 100 }));

const TinyAreaChart = ({ height }: { height?: number | string }) => (
  <ResponsiveContainer width="100%" height={height}>
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
        fill={colors["primary-02"]}
      />
    </AreaChart>
  </ResponsiveContainer>
);

TinyAreaChart.defaultProps = {
  height: 25,
};

export { TinyAreaChart };

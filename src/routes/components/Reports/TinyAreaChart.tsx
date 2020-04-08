import React from "react";
import _ from "lodash";

import colors from "../../../colors";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const data = _.times(20, () => ({ pv: Math.random() * 100 }));

const TinyAreaChart = () => (
  <ResponsiveContainer width="100%" height={40}>
    <AreaChart data={data}>
      <Area
        dataKey="pv"
        stroke={colors["primary"]}
        fill={colors["primary-03"]}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export { TinyAreaChart };

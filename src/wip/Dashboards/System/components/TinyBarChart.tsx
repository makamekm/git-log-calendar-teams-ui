import React from "react";
import _ from "lodash";
import colors from "~/colors";
import { ResponsiveContainer, BarChart, Bar } from "recharts";

const TinyBarChart = (props: { barColor?: string }) => {
  const data = _.times(40, () => ({ pv: 20 + Math.random() * 100 }));
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart data={data} margin={{ top: 0, bottom: 0, right: 0, left: 0 }}>
        <Bar dataKey="pv" fill={colors[props.barColor]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

TinyBarChart.defaultProps = {
  barColor: "200",
};

export { TinyBarChart };

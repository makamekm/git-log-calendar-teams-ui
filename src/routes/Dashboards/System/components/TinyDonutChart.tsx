import React from "react";

import colors from "~/colors";
import { PieChart, Pie, Cell } from "recharts";

const TinyDonutChart = (props: {
  pieColor?: string;
  strokeColor?: string;
  pieBg?: string;
}) => {
  const data = [
    { name: "Group A", value: 40 + Math.random() * 100 },
    { name: "Group B", value: Math.random() * 100 },
  ];
  return (
    <PieChart width={80} height={80}>
      <Pie
        data={data}
        dataKey="value"
        stroke={colors[props.strokeColor]}
        innerRadius={28}
        outerRadius={35}
        fill={colors[props.pieBg]}
      >
        <Cell fill={colors[props.pieColor]} />
      </Pie>
    </PieChart>
  );
};

TinyDonutChart.defaultProps = {
  pieColor: "primary",
  strokeColor: "white",
  pieBg: "200",
};

export { TinyDonutChart };

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import colorsBase from "~/colors";

export const TinyDonutChart = ({
  data,
  colorShift,
  colors,
}: {
  data: { name: string; value: number }[];
  colors: string[];
  colorShift?: number;
}) => (
  <PieChart width={80} height={80}>
    <Pie
      data={data}
      dataKey="value"
      stroke={colorsBase["white"]}
      innerRadius={26}
      outerRadius={35}
      fill="#8884d8"
    >
      {data.map((entry, index) => (
        <Cell
          key={index}
          fill={colorsBase[colors[(index + (colorShift || 0)) % colors.length]]}
        />
      ))}
    </Pie>
  </PieChart>
);

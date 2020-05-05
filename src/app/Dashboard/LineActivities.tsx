import React from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ReferenceLine,
  Line,
} from "recharts";
import colors from "~/colors";

const colorsArr = ["success", "primary", "yellow", "info", "purple"];

const addEmptyDays = (
  data: ({
    day: string;
  } & any)[],
  names: string[],
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  startDate = moment(startDate);
  const days = endDate.diff(startDate, "day", false);

  const newData: ({
    day: string;
  } & any)[] = [];

  for (let i = 0; i <= days; i++) {
    let day = startDate.format("YYYY-MM-DD");
    const date = data.find((d) => d.day === day);
    newData[i] = {
      ...date,
      day,
    };
    names.forEach((name) => {
      newData[i][name] = newData[i][name] || 0;
    });
    startDate.add(1, "day");
  }

  return newData;
};

export const LineActivities = ({
  height,
  className,
  names,
  data,
  limit,
}: {
  height?: number;
  limit: number;
  className?: string;
  names: string[];
  data: ({
    day: string;
  } & any)[];
}) => {
  const now = moment();
  const past = moment().subtract(limit, "days");
  data = addEmptyDays(data, names, past, now);
  return (
    <ResponsiveContainer width="100%" minHeight={height} className={className}>
      <LineChart
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
        <Legend />
        {names.map((name, index) => (
          <Line
            type="monotone"
            key={name}
            dataKey={name}
            stroke={colors[colorsArr[index % colorsArr.length]]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
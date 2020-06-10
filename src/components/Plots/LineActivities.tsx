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
import { useMediaQuery } from "react-responsive";

const colorsArr = ["green", "blue", "yellow", "cyan", "purple"];

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
  maxValue,
}: {
  height?: number;
  limit: number;
  className?: string;
  names: string[];
  maxValue?: number;
  data: ({
    day: string;
  } & any)[];
}) => {
  const now = moment();
  const past = moment().subtract(limit, "days");
  data = addEmptyDays(data, names, past, now);
  const isPrint = useMediaQuery({
    print: true,
  });
  return (
    <ResponsiveContainer
      width={isPrint ? 920 : "100%"}
      minHeight={height}
      className={className}
    >
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
            fill: "currentColor",
          }}
        />
        <YAxis
          domain={maxValue ? [0, (max) => Math.min(max, maxValue)] : undefined}
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
            fill: "currentColor",
          }}
        />
        <Tooltip
          isAnimationActive={!isPrint}
          contentStyle={{
            color: "#333",
          }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Legend />
        {names.map((name, index) => (
          <Line
            isAnimationActive={!isPrint}
            type="linear"
            key={name}
            dataKey={name}
            stroke={colors[colorsArr[index % colorsArr.length]]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

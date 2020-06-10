import React from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Brush,
  Bar,
} from "recharts";
import colors from "~/colors";
import { useMediaQuery } from "react-responsive";

const addEmptyDays = (
  data: {
    day: string;
    value: number;
  }[],
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  startDate = moment(startDate);
  const days = endDate.diff(startDate, "day", false);

  const newData: {
    day: string;
    value: number;
  }[] = [];

  for (let i = 0; i <= days; i++) {
    let day = startDate.format("YYYY-MM-DD");
    const date = data.find((d) => d.day === day);
    newData[i] = {
      day,
      value: date?.value || 0,
    };
    startDate.add(1, "day");
  }

  return newData;
};

export const BarActivities = ({
  height,
  className,
  data,
  limit,
  maxValue,
}: {
  height?: number;
  limit: number;
  className?: string;
  maxValue?: number;
  data: {
    day: string;
    value: number;
  }[];
}) => {
  const now = moment();
  const past = moment().subtract(limit, "days");
  data = addEmptyDays(data, past, now);
  const isPrint = useMediaQuery({
    print: true,
  });
  return (
    <ResponsiveContainer
      width={isPrint ? 920 : "100%"}
      minHeight={height}
      className={className}
    >
      <BarChart
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
          content={(props) => {
            return (
              <div
                className="p-2"
                style={{
                  border: "solid 1px #ccc",
                  background: "white",
                  color: "#333",
                }}
              >
                {props.label} -{" "}
                <strong>
                  {data.find((d) => d.day === props.label)?.value}
                </strong>
              </div>
            );
          }}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Brush
          dataKey="day"
          height={30}
          stroke={colors["blue"]}
          isAnimationActive={!isPrint}
        />
        <Bar
          isAnimationActive={!isPrint}
          dataKey="value"
          fill={"rgba(30, 183, 255, 0.7)"}
          stroke={colors["blue"]}
          strokeWidth={2}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

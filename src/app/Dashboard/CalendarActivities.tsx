import React from "react";
import moment from "moment";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";

export const CalendarActivities = ({
  height,
  className,
  limit,
  data,
  maxValue,
}: {
  height?: number;
  className?: string;
  limit: number;
  maxValue?: number;
  data: {
    day: string;
    value: number;
  }[];
}) => {
  const now = moment().format("YYYY-MM-DD");
  const past = moment().subtract(limit, "days").format("YYYY-MM-DD");
  const years = moment().year() - moment().subtract(limit, "days").year() + 1;
  return (
    <div
      className={className}
      style={{
        position: "relative",
        height: `${height * years}px`,
        maxHeight: `${height * years}px`,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
        }}
      >
        <ResponsiveCalendarCanvas
          data={data}
          from={past}
          to={now}
          maxValue={maxValue || "auto"}
          minValue={0}
          emptyColor="#eeeeee"
          colors={[
            "#e6ffe6",
            "#99ff99",
            "#66ff66",
            "#33ff33",
            "#00ff00",
            "#00cc00",
            "#009900",
            "#008000",
            "#006600",
          ]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
        />
      </div>
    </div>
  );
};

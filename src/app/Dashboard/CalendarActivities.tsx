import React from "react";
import moment from "moment";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";

export const CalendarActivities = ({
  height,
  className,
  limit,
  data,
}: {
  height?: string;
  className?: string;
  limit: number;
  data: {
    day: string;
    value: number;
  }[];
}) => {
  const now = moment().format("YYYY-MM-DD");
  const past = moment().subtract(limit, "days").format("YYYY-MM-DD");
  return (
    <div
      className={className}
      style={{
        position: "relative",
        height,
        maxHeight: height,
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
          maxValue="auto"
          minValue={0}
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </div>
    </div>
  );
};

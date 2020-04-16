import React from "react";
import data from "./calendarData.json";
import { ResponsiveCalendarCanvas } from "@nivo/calendar";

export const AudienceCalendarActivities = ({
  height,
  className,
}: {
  height?: string;
  className?: string;
}) => (
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
        from="2014-03-01"
        to="2016-07-12"
        minValue="auto"
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

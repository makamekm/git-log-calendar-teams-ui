import React from "react";
import classNames from "classnames";
import moment from "moment";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useMediaQuery } from "react-responsive";

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
  const isPrint = useMediaQuery({
    print: true,
  });
  const isDarkModeRaw = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  const isDarkMode = !isPrint && isDarkModeRaw;
  return (
    <div
      className={classNames(
        "calendar-activities relative text-gray-900 w-full",
        className
      )}
      style={{
        height: `${height * years}px`,
        maxHeight: `${height * years}px`,
        minHeight: `${height * years}px`,
        overflow: "hidden",
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 right-0">
        <ResponsiveCalendar
          data={data}
          from={past}
          to={now}
          maxValue={maxValue || "auto"}
          minValue={0}
          emptyColor="#f0eeee"
          monthBorderWidth={3}
          monthBorderColor={isDarkMode ? "#aaa" : "#ccc"}
          dayBorderColor={"#fff"}
          colors={
            isDarkMode
              ? [
                  "rgba(115, 205, 97, 0.3)",
                  "rgba(115, 205, 97, 0.4)",
                  "rgba(115, 205, 97, 0.5)",
                  "rgba(115, 205, 97, 0.6)",
                  "rgba(115, 205, 97, 0.7)",
                  "rgba(115, 205, 97, 0.8)",
                  "rgba(115, 205, 97, 0.9)",
                  "rgba(115, 205, 97, 1.0)",
                ]
              : [
                  "rgba(0, 153, 0, 0.3)",
                  "rgba(0, 153, 0, 0.4)",
                  "rgba(0, 153, 0, 0.5)",
                  "rgba(0, 153, 0, 0.6)",
                  "rgba(0, 153, 0, 0.7)",
                  "rgba(0, 153, 0, 0.8)",
                  "rgba(0, 153, 0, 0.9)",
                  "rgba(0, 153, 0, 1.0)",
                ]
          }
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          dayBorderWidth={2}
        />
      </div>
      <style jsx>{`
        .calendar-activities :global(text) {
          fill: ${isDarkMode ? "#fff" : "#333"} !important;
        }
      `}</style>
    </div>
  );
};

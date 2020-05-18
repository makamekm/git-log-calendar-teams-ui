import React from "react";
import classNames from "classnames";
import moment from "moment";
import { ResponsiveCalendar, Calendar } from "@nivo/calendar";
import { useMediaQuery } from "react-responsive";

const getColorNumber = (o, n) => (o + (255 - o) * (1 - n)).toFixed(0);

const colors = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map(
  (n) =>
    `rgb(${getColorNumber(0, n)}, ${getColorNumber(175, n)}, ${getColorNumber(
      0,
      n
    )})`
);

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
        {isPrint ? (
          <Calendar
            height={height * years}
            width={990}
            data={data}
            isInteractive={!isPrint}
            from={past}
            to={now}
            maxValue={maxValue || "auto"}
            minValue={0}
            emptyColor="#f0eeee"
            monthBorderWidth={3}
            monthBorderColor={isDarkMode ? "#aaa" : "#ccc"}
            dayBorderColor={"#fff"}
            colors={colors}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            dayBorderWidth={2}
          />
        ) : (
          <ResponsiveCalendar
            data={data}
            isInteractive={!isPrint}
            from={past}
            to={now}
            maxValue={maxValue || "auto"}
            minValue={0}
            emptyColor="#f0eeee"
            monthBorderWidth={3}
            monthBorderColor={isDarkMode ? "#aaa" : "#ccc"}
            dayBorderColor={"#fff"}
            colors={colors}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            dayBorderWidth={2}
          />
        )}
      </div>
      <style jsx>{`
        .calendar-activities :global(text) {
          fill: ${isDarkMode ? "#fff" : "#333"} !important;
        }
      `}</style>
    </div>
  );
};

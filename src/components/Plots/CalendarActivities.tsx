import React from "react";
import classNames from "classnames";
import moment from "moment";
import Chart from "react-google-charts";
import { useMediaQuery } from "react-responsive";

export const CalendarActivities = ({
  className,
  limit,
  data,
  maxValue,
}: {
  className?: string;
  limit: number;
  maxValue?: number;
  data: {
    day: string;
    value: number;
  }[];
}) => {
  const years = moment().year() - moment().subtract(limit, "days").year() + 1;
  const isPrint = useMediaQuery({
    print: true,
  });
  return (
    <div
      className={classNames(
        "calendar-activities text-gray-900 w-full flex justify-center items-center",
        className
      )}
    >
      <Chart
        chartType="Calendar"
        height={150 * years + 50}
        style={{
          maxWidth: "950px",
          width: isPrint ? "950px" : "calc(100% - 20px)",
        }}
        data={[
          [
            {
              type: "date",
              id: "Date",
            },
            {
              type: "number",
              id: "Activity",
            },
          ],
          ...data.map((d) => [
            new Date(d.day),
            maxValue ? Math.min(maxValue, d.value) : d.value,
          ]),
        ]}
      />
    </div>
  );
};

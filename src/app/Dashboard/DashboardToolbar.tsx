import React from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import moment from "moment";
import { periods } from "./Periods";
import { DashboardState } from "../DashboardService";
import { Dropdown } from "~/components/Dropdown/Dropdown";

const PeriodValues = observer(({ state }: { state: DashboardState }) => {
  return (
    <>
      {Object.keys(periods).map((key: any) => {
        key = Number(key);
        return (
          <button
            onClick={(e) => {
              e.currentTarget.blur();
              state.limit = key;
            }}
            key={key}
            className={classNames(
              "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline",
              {
                "bg-gray-200 text-gray-900": state.limit === key,
              }
            )}
          >
            {periods[key]}
          </button>
        );
      })}
    </>
  );
});

export const DashboardToolbar = observer(
  ({ state }: { state: DashboardState }) => {
    const now = moment().format("YYYY/MM/DD");
    const past = moment().subtract(state.limit, "days").format("YYYY/MM/DD");

    return (
      <div className="flex flex-wrap justify-end ml-auto">
        <div className="flex-column pr-4 mt-2 mb-2 text-right">
          <input
            className="no-print mb-2 shadow-sm appearance-none border rounded py-2 px-3 text-grey-darker leading-none focus:outline-none focus:shadow-outline"
            placeholder="Activity Max Value"
            type="number"
            value={state.maxValue || ""}
            onChange={(e) => {
              state.maxValue = Number(e.currentTarget.value);
            }}
          />
          <div className="text-xs">
            Activity max value: <strong>{state.maxValue || "auto"}</strong>
          </div>
        </div>
        <div className="flex-column pr-4 mt-2 mb-2 text-right">
          <Dropdown
            className="mb-2"
            title={
              <>
                <i className="far fa-calendar-alt mr-2"></i>
                {periods[state.limit]}
              </>
            }
          >
            <div className="block w-full my-1 px-4 py-1 text-left text-xs focus:outline-none text-left">
              Select Period:
            </div>
            <PeriodValues state={state} />
          </Dropdown>
          <div className="text-xs">
            {past} to {now}
          </div>
        </div>
      </div>
    );
  }
);

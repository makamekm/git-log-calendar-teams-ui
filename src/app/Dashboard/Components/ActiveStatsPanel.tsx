import React from "react";
import classNames from "classnames";
import { numberWithCommas } from "~/tools";
import { periods } from "./Periods";

export const ActiveStatsPanel = ({
  activeRepositories,
  activeTeams,
  activeUsers,
  activeRepositoriesToday,
  activeTeamsToday,
  activeUsersToday,
  limit,
  className,
}: {
  className?: string;
  activeRepositories?: number;
  activeTeams?: number;
  activeUsers?: number;
  activeRepositoriesToday?: number;
  activeTeamsToday?: number;
  activeUsersToday?: number;
  limit: number;
}) => {
  return (
    <div className={classNames("no-print-break", className)}>
      <div className="hr-text hr-text-left my-2">
        <span>Today / {periods[limit]} Active Stats</span>
      </div>
      <div className="w-full">
        {activeRepositories != null && (
          <div className="flex items-center justify-between border-b dark-mode:border-gray-700">
            <div className="text-gray-700 dark-mode:text-gray-400">
              Active Repositories
            </div>
            <div className="text-right">
              <div className="rounded-full text-sm py-1 px-2 mx-1 my-2 bg-green-500 text-white rounded leading-none font-semibold flex items-center">
                {numberWithCommas(activeRepositoriesToday)} /{" "}
                {numberWithCommas(activeRepositories)}
              </div>
            </div>
          </div>
        )}
        {activeTeams != null && (
          <div className="flex items-center justify-between border-b dark-mode:border-gray-700">
            <div className="text-gray-700 dark-mode:text-gray-400">
              Active Teams
            </div>
            <div className="text-right">
              <div className="rounded-full text-sm py-1 px-2 mx-1 my-2 bg-blue-500 text-white rounded leading-none font-semibold flex items-center">
                {numberWithCommas(activeTeamsToday)} /{" "}
                {numberWithCommas(activeTeams)}
              </div>
            </div>
          </div>
        )}
        {activeUsers != null && (
          <div className="flex items-center justify-between border-b dark-mode:border-gray-700">
            <div className="text-gray-700 dark-mode:text-gray-400">
              Active Users
            </div>
            <div className="text-right">
              <div className="rounded-full text-sm py-1 px-2 mx-1 my-2 bg-orange-500 text-white rounded leading-none font-semibold flex items-center">
                {numberWithCommas(activeUsersToday)} /{" "}
                {numberWithCommas(activeUsers)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

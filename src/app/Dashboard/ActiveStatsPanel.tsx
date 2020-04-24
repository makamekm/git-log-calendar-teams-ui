import React from "react";
import classNames from "classnames";
import { Table, Badge } from "~/components";
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
      <Table size="sm">
        <tbody>
          {activeRepositories != null && (
            <tr>
              <td className="text-inverse">Active Repositories</td>
              <td className="text-right">
                <Badge color="success" pill>
                  {numberWithCommas(activeRepositoriesToday)} /{" "}
                  {numberWithCommas(activeRepositories)}
                </Badge>
              </td>
            </tr>
          )}
          {activeTeams != null && (
            <tr>
              <td className="text-inverse">Active Teams</td>
              <td className="text-right">
                <Badge color="primary" pill>
                  {numberWithCommas(activeTeamsToday)} /{" "}
                  {numberWithCommas(activeTeams)}
                </Badge>
              </td>
            </tr>
          )}
          {activeUsers != null && (
            <tr>
              <td className="text-inverse">Active Users</td>
              <td className="text-right">
                <Badge color="info" pill>
                  {numberWithCommas(activeUsersToday)} /{" "}
                  {numberWithCommas(activeUsers)}
                </Badge>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

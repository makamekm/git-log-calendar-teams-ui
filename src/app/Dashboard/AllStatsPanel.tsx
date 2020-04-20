import React from "react";
import { Table, Badge } from "~/components";

export const AllStatsPanel = () => {
  return (
    <>
      <div className="hr-text hr-text-left my-2">
        <span>All Stats</span>
      </div>
      <Table size="sm">
        <tbody>
          <tr>
            <td className="text-inverse bt-0">Active Projects</td>
            <td className="text-right bt-0">
              <Badge color="success" pill>
                6
              </Badge>
            </td>
          </tr>
          <tr>
            <td className="text-inverse">Active Teams</td>
            <td className="text-right">
              <Badge color="primary" pill>
                4
              </Badge>
            </td>
          </tr>
          <tr>
            <td className="text-inverse">Active Developers</td>
            <td className="text-right">
              <Badge color="info" pill>
                15
              </Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

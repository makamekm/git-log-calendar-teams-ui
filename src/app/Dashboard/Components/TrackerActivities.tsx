import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { groupBy } from "lodash";

import { CalendarActivities } from "~/components/Plots/CalendarActivities";
import { DashboardService } from "../DashboardService";
import { FavouriteService } from "../FavouriteService";
import { Link } from "react-router-dom";
import { HeaderSection } from "~/components/Blocks/HeaderSection";
import { Dropdown } from "~/components/Dropdown/Dropdown";

export const TrackerActivities = observer(() => {
  const stateDashboard = React.useContext(DashboardService);
  const stateFavourite = React.useContext(FavouriteService);
  const groupped: {
    user?: {
      name: string;
    }[];
    repository?: {
      name: string;
    }[];
    team?: {
      name: string;
    }[];
  } = stateFavourite.trackers ? groupBy(stateFavourite.trackers, "type") : {};
  return (
    <>
      {groupped.user?.length > 0 && (
        <HeaderSection
          no="Users"
          title="#user"
          subTitle="Calendar Activity"
          className="my-5"
        />
      )}

      {groupped.user?.map(({ name }, index) => (
        <div
          key={index}
          className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner"
        >
          <div className="flex items-center justify-between text-base w-full px-6 py-4">
            <Link to={`/user/${name}`}>
              <i className="fa fa-link no-print mr-1"></i>
              <strong>{name}</strong>
              <span className="small ml-1 text-muted">#user</span>
            </Link>
            <Dropdown
              className="no-print -my-2 -mx-3"
              title={<i className="fas fa-cog"></i>}
            >
              <button
                className={
                  "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                }
                onClick={() => {
                  stateFavourite.removeTracker(name, "user");
                }}
              >
                <i className="fa fa-trash mr-2"></i>
                Delete
              </button>
            </Dropdown>
          </div>
          <div>
            {stateDashboard.isLoading || stateFavourite.isLoading ? (
              <List className="p-4" height={"250px"} />
            ) : (
              <CalendarActivities
                maxValue={stateDashboard.maxValueDelay}
                limit={stateDashboard.limit}
                data={stateDashboard.userStats[name] || []}
              />
            )}
          </div>
        </div>
      ))}

      {groupped.team?.length > 0 && (
        <HeaderSection
          no="Teams"
          title="#team"
          subTitle="Calendar Activity"
          className="my-5"
        />
      )}

      {groupped.team?.map(({ name }, index) => (
        <div
          key={index}
          className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner"
        >
          <div className="flex items-center justify-between text-base w-full px-6 py-4">
            <Link to={`/team/${name}`}>
              <i className="fa fa-link no-print mr-1"></i>
              <strong>{name}</strong>
              <span className="small ml-1 text-muted">#team</span>
            </Link>
            <Dropdown
              className="no-print -my-2 -mx-3"
              title={<i className="fas fa-cog"></i>}
            >
              <button
                className={
                  "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                }
                onClick={() => {
                  stateFavourite.removeTracker(name, "team");
                }}
              >
                <i className="fa fa-trash mr-2"></i>
                Delete
              </button>
            </Dropdown>
          </div>
          <div>
            {stateDashboard.isLoading || stateFavourite.isLoading ? (
              <List className="p-4" height={"250px"} />
            ) : (
              <CalendarActivities
                maxValue={stateDashboard.maxValueDelay}
                limit={stateDashboard.limit}
                data={stateDashboard.teamStats[name] || []}
              />
            )}
          </div>
        </div>
      ))}

      {groupped.repository?.length > 0 && (
        <HeaderSection
          no="Repositories"
          title="#repository"
          subTitle="Calendar Activity"
          className="my-5"
        />
      )}

      {groupped.repository?.map(({ name }, index) => (
        <div
          key={index}
          className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner"
        >
          <div className="flex items-center justify-between text-base w-full px-6 py-4">
            <Link to={`/repository/${name}`}>
              <i className="fa fa-link no-print mr-1"></i>
              <strong>{name}</strong>
              <span className="small ml-1 text-muted">#repository</span>
            </Link>
            <Dropdown
              className="no-print -my-2 -mx-3"
              title={<i className="fas fa-cog"></i>}
            >
              <button
                className={
                  "block w-full my-1 px-4 py-1 text-left text-sm rounded-lg dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                }
                onClick={() => {
                  stateFavourite.removeTracker(name, "repository");
                }}
              >
                <i className="fa fa-trash mr-2"></i>
                Delete
              </button>
            </Dropdown>
          </div>
          <div>
            {stateDashboard.isLoading || stateFavourite.isLoading ? (
              <List className="p-4" height={"250px"} />
            ) : (
              <CalendarActivities
                maxValue={stateDashboard.maxValueDelay}
                limit={stateDashboard.limit}
                data={stateDashboard.repositoriesStats[name] || []}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
});

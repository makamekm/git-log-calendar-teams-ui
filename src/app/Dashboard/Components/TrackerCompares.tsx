import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import { CalendarActivities } from "~/components/Plots/CalendarActivities";
import { DashboardService } from "../DashboardService";
import { FavouriteService } from "../FavouriteService";
import { Link } from "react-router-dom";
import { HeaderSection } from "~/components/Blocks/HeaderSection";
import { Dropdown } from "~/components/Dropdown/Dropdown";
import { TopPanel } from "./TopPanel";
import { ActiveStatsPanel } from "./ActiveStatsPanel";

export const TrackerCompares = observer(() => {
  const stateDashboard = React.useContext(DashboardService);
  const stateFavourite = React.useContext(FavouriteService);
  return (
    <>
      {stateFavourite.groupped.user?.length > 0 && (
        <>
          <HeaderSection
            no="Users"
            title="#user"
            subTitle="Calendar Activity"
            className="my-5"
          />
          <div className="flex flex-col w-full justify-center items-center mb-8">
            <TopPanel
              className="w-full"
              type="user"
              name="Users"
              data={stateFavourite.topUsers || []}
            />
            <ActiveStatsPanel
              className="w-full mt-4"
              activeUsers={stateFavourite.activeUsers}
              activeUsersToday={stateFavourite.activeUsersToday}
              limit={stateDashboard.limit}
            />
          </div>
        </>
      )}

      {stateFavourite.groupped.user?.map(({ name }, index) => (
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

      {stateFavourite.groupped.team?.length > 0 && (
        <>
          <HeaderSection
            no="Teams"
            title="#team"
            subTitle="Calendar Activity"
            className="my-5"
          />
          <div className="flex flex-col w-full justify-center items-center mb-8">
            <TopPanel
              className="w-full"
              type="team"
              name="Teams"
              data={stateFavourite.topTeams || []}
            />
            <ActiveStatsPanel
              className="w-full mt-4"
              activeTeams={stateFavourite.activeTeams}
              activeTeamsToday={stateFavourite.activeTeamsToday}
              limit={stateDashboard.limit}
            />
          </div>
        </>
      )}

      {stateFavourite.groupped.team?.map(({ name }, index) => (
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

      {stateFavourite.groupped.repository?.length > 0 && (
        <>
          <HeaderSection
            no="Repositories"
            title="#repository"
            subTitle="Calendar Activity"
            className="my-5"
          />
          <div className="flex flex-col w-full justify-center items-center mb-8">
            <TopPanel
              className="w-full"
              type="repository"
              name="Repositories"
              data={stateFavourite.topRepositories || []}
            />
            <ActiveStatsPanel
              className="w-full mt-4"
              activeRepositories={stateFavourite.activeRepositories}
              activeRepositoriesToday={stateFavourite.activeRepositoriesToday}
              limit={stateDashboard.limit}
            />
          </div>
        </>
      )}

      {stateFavourite.groupped.repository?.map(({ name }, index) => (
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

import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Link } from "react-router-dom";

import { HeaderMain } from "~/components/Blocks/HeaderMain";
import { DashboardService } from "./DashboardService";
import { useParams } from "react-router";
import { useOnLoad } from "~/hooks";
import { DashboardToolbar } from "./Components/DashboardToolbar";
import { TopPanel } from "./Components/TopPanel";
import { periods } from "./Components/Periods";
import { TotalChangedLinesPanel } from "./Components/TotalChangedLinesPanel";
import { TotalCommitsPanel } from "./Components/TotalCommitsPanel";
import { ActiveStatsPanel } from "./Components/ActiveStatsPanel";
import { CalendarActivities } from "~/components/Plots/CalendarActivities";
import { HeaderSection } from "~/components/Blocks/HeaderSection";
import { LatestMessages } from "./Components/LastMessages";
import { BarActivities } from "~/components/Plots/BarActivities";
import { LineActivities } from "~/components/Plots/LineActivities";
import { useLayoutConfig } from "~/components/Layout/LayoutService";

export const TeamDashboard = observer(() => {
  const { teamName } = useParams();
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = "team";
    state.name = teamName;
    state.load();
  }, [state, teamName]);
  useOnLoad(onLoad);
  useLayoutConfig({
    pageTitle: `${teamName} - Team`,
    breadcrumbs: [
      {
        name: "Dashboard",
        url: "/dashboard",
      },
      {
        name: `${teamName}`,
      },
    ],
  });

  return (
    <>
      <div className="mb-5">
        <div className="flex flex-wrap mb-3">
          <HeaderMain
            title={
              <>
                {teamName} <span className="text-sm">#team</span>
              </>
            }
            className="mt-0 mb-3"
          />
          <DashboardToolbar state={state} />
        </div>
        {state.isLoading ? (
          <List height="300px" />
        ) : (
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 lg:col-span-2">
              <TotalCommitsPanel
                className="mt-6"
                valueToday={state.stats?.commits.todayValue}
                valueLimited={state.stats?.commits.value}
                limit={state.limit}
              />
              <TotalChangedLinesPanel
                className="mt-6"
                valueToday={state.stats?.changes.todayValue}
                valueLimited={state.stats?.changes.value}
                limit={state.limit}
              />
              <ActiveStatsPanel
                className="mt-6"
                activeRepositories={
                  state.stats?.stats.activeRepositories?.value
                }
                activeUsers={state.stats?.stats.activeUsers?.value}
                activeRepositoriesToday={
                  state.stats?.stats.activeRepositories?.todayValue
                }
                activeUsersToday={state.stats?.stats.activeUsers?.todayValue}
                limit={state.limit}
              />
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <TopPanel
                className="mt-6"
                type="repository"
                name={`Repositories ${periods[state.limit]}`}
                data={state.stats?.topRepositories?.value}
              />
              <TopPanel
                className="mt-6"
                type="user"
                name={`Users ${periods[state.limit]}`}
                colorShift={2}
                data={state.stats?.topUsers?.value}
              />
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <TopPanel
                className="mt-6"
                type="repository"
                name="Repositories Today"
                data={state.stats?.topRepositories?.todayValue}
              />
              <TopPanel
                className="mt-6"
                type="user"
                name="Users Today"
                colorShift={2}
                data={state.stats?.topUsers?.todayValue}
              />
            </div>
          </div>
        )}
      </div>

      <LatestMessages />

      <HeaderSection
        no={"Overall"}
        title="All Stats"
        subTitle="Calendar Activity"
        className="my-5"
      />

      <div className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner">
        <div className="flex items-center text-base w-full px-6 py-4">
          <span>
            Calendar activities of <strong>{teamName}</strong>
            <span className="text-xs ml-2 text-gray-400">#team</span>
          </span>
        </div>
        <div>
          {state.isLoading ? (
            <List className="p-4" height={"300px"} />
          ) : (
            <>
              <CalendarActivities
                maxValue={state.maxValueDelay}
                limit={state.limit}
                data={state.teamStats[teamName] || []}
              />
            </>
          )}
        </div>
      </div>

      <div className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner">
        <div className="flex items-center text-base w-full px-6 py-4">
          <span>
            Detailed activities of <strong>{teamName}</strong>
            <span className="text-xs ml-2 text-gray-400">#team</span>
          </span>
        </div>
        <div className="p-4">
          {state.isLoading ? (
            <List height={"250px"} />
          ) : (
            <BarActivities
              maxValue={state.maxValueDelay}
              height={250}
              limit={state.limit}
              data={state.teamStats[teamName] || []}
            />
          )}
        </div>
      </div>

      <div className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner">
        <div className="flex items-center text-base w-full px-6 py-4">
          <span>
            User activities of <strong>{teamName}</strong>
            <span className="text-xs ml-2 text-gray-400">#team</span>
          </span>
        </div>
        <div className="p-4">
          {state.isLoading ? (
            <List height={"250px"} />
          ) : (
            <LineActivities
              maxValue={state.maxValueDelay}
              names={state.users}
              height={250}
              limit={state.limit}
              data={state.userCompareStats || []}
            />
          )}
        </div>
      </div>

      <div className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner">
        <div className="flex items-center text-base w-full px-6 py-4">
          <span>
            Repository activities of <strong>{teamName}</strong>
            <span className="text-xs ml-2 text-gray-400">#team</span>
          </span>
        </div>
        <div className="p-4">
          {state.isLoading ? (
            <List height={"250px"} />
          ) : (
            <LineActivities
              names={state.repositories}
              height={250}
              limit={state.limit}
              data={state.repositoryCompareStats || []}
            />
          )}
        </div>
      </div>

      {state.users.length > 0 && (
        <HeaderSection
          no={"Users"}
          title="Team Stats"
          subTitle="Calendar Activity"
          className="my-5"
        />
      )}

      {state.users.map((user, index) => (
        <div
          key={index}
          className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner"
        >
          <div className="flex items-center text-base w-full px-6 py-4">
            <Link to={`/user/${user}`}>
              <i className="fa fa-link no-print mr-1"></i>
              <strong>{user}</strong>
              <span className="small ml-1 text-muted">#user</span>
            </Link>
          </div>
          <div>
            {state.isLoading ? (
              <List className="p-4" height={"250px"} />
            ) : (
              <CalendarActivities
                maxValue={state.maxValueDelay}
                limit={state.limit}
                data={state.userStats[user] || []}
              />
            )}
          </div>
        </div>
      ))}

      {state.repositories.length > 0 && (
        <HeaderSection
          no={"Repositories"}
          title="Team Stats"
          subTitle="Calendar Activity"
          className="my-5"
        />
      )}

      {state.repositories.map((repository, index) => (
        <div
          key={index}
          className="no-print-break mt-3 border bg-white rounded-lg shadow-md text-gray-700 dark-mode:text-gray-300 dark-mode:bg-gray-900 dark-mode:border dark-mode:border-gray-800 dark-mode:shadow-inner"
        >
          <div className="flex items-center text-base w-full px-6 py-4">
            <Link to={`/repository/${repository}`}>
              <i className="fa fa-link no-print mr-1"></i>
              <strong>{repository}</strong>
              <span className="small ml-1 text-muted">#repository</span>
            </Link>
          </div>
          <div>
            {state.isLoading ? (
              <List className="p-4" height={"250px"} />
            ) : (
              <CalendarActivities
                maxValue={state.maxValueDelay}
                limit={state.limit}
                data={state.repositoriesStats[repository] || []}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
});

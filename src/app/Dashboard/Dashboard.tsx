import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import { HeaderMain } from "~/components/Blocks/HeaderMain";
import { TotalCommitsPanel } from "./Components/TotalCommitsPanel";
import { TotalChangedLinesPanel } from "./Components/TotalChangedLinesPanel";
import { TopPanel } from "./Components/TopPanel";
import { ActiveStatsPanel } from "./Components/ActiveStatsPanel";
import { DashboardToolbar } from "./Components/DashboardToolbar";
import { DashboardService } from "./DashboardService";
import { TrackersSelector } from "./Components/TrackerSelector";
import { TrackerActivities } from "./Components/TrackerActivities";
import { periods } from "./Components/Periods";
import { useOnLoad } from "~/hooks";
import { useLayoutConfig } from "~/components/Layout/LayoutService";

export const Dashboard = observer(() => {
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = null;
    state.name = null;
    state.load();
  }, [state]);
  useOnLoad(onLoad);
  useLayoutConfig({
    pageTitle: "Dashboard",
    breadcrumbs: [
      {
        name: "Dashboard",
      },
    ],
  });

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-wrap mb-3">
          <HeaderMain title="Dashboard" className="mb-3" />
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
                activeTeams={state.stats?.stats.activeTeams?.value}
                activeUsers={state.stats?.stats.activeUsers?.value}
                activeRepositoriesToday={
                  state.stats?.stats.activeRepositories?.todayValue
                }
                activeTeamsToday={state.stats?.stats.activeTeams?.todayValue}
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
                type="team"
                name={`Teams ${periods[state.limit]}`}
                colorShift={1}
                data={state.stats?.topTeams?.value}
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
                type="team"
                name="Teams Today"
                colorShift={1}
                data={state.stats?.topTeams?.todayValue}
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

      <div className="mb-3 no-print">
        <TrackersSelector />
      </div>

      <TrackerActivities />
    </>
  );
});

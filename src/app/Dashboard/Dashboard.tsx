import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";

import { Container, Row, Col, WithLayoutMeta } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { TotalCommitsPanel } from "./TotalCommitsPanel";
import { TotalChangedLinesPanel } from "./TotalChangedLinesPanel";
import { TopPanel } from "./TopPanel";
import { ActiveStatsPanel } from "./ActiveStatsPanel";
import { DashboardToolbar } from "./DashboardToolbar";
import { DashboardService } from "../DashboardService";
import { TrackersSelector } from "./TrackerSelector";
import { TrackerActivities } from "./TrackerActivities";
import { periods } from "./Periods";
import { useOnLoad } from "~/hooks";

export const Dashboard = observer(() => {
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = null;
    state.name = null;
    state.load();
  }, [state]);
  useOnLoad(onLoad);

  return (
    <Container className="pb-4">
      <WithLayoutMeta
        meta={{
          pageTitle: "Dashboard",
          breadcrumbs: [
            {
              name: "Dashboard",
            },
          ],
        }}
      />
      <Row className="mb-5">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-3">
            <HeaderMain title="Dashboard" className="mt-0 mb-3" />
            <DashboardToolbar state={state} />
          </div>
        </Col>
        {state.isLoading ? (
          <List height="300px" />
        ) : (
          <>
            <Col lg={4}>
              <TotalCommitsPanel
                className="mt-4"
                valueToday={state.stats?.commits.todayValue}
                valueLimited={state.stats?.commits.value}
                limit={state.limit}
              />
              <TotalChangedLinesPanel
                className="mt-4"
                valueToday={state.stats?.changes.todayValue}
                valueLimited={state.stats?.changes.value}
                limit={state.limit}
              />
              <ActiveStatsPanel
                className="mt-4"
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
            </Col>
            <Col lg={4} md={12}>
              <TopPanel
                className="mt-4"
                type="repository"
                name={`Repositories ${periods[state.limit]}`}
                data={state.stats?.topRepositories?.value}
              />
              <TopPanel
                className="mt-4"
                type="team"
                name={`Teams ${periods[state.limit]}`}
                colorShift={1}
                data={state.stats?.topTeams?.value}
              />
              <TopPanel
                className="mt-4"
                type="user"
                name={`Users ${periods[state.limit]}`}
                colorShift={2}
                data={state.stats?.topUsers?.value}
              />
            </Col>
            <Col lg={4} md={12}>
              <TopPanel
                className="mt-4"
                type="repository"
                name="Repositories Today"
                data={state.stats?.topRepositories?.todayValue}
              />
              <TopPanel
                className="mt-4"
                type="team"
                name="Teams Today"
                colorShift={1}
                data={state.stats?.topTeams?.todayValue}
              />
              <TopPanel
                className="mt-4"
                type="user"
                name="Users Today"
                colorShift={2}
                data={state.stats?.topUsers?.todayValue}
              />
            </Col>
          </>
        )}
      </Row>

      <Row className="mb-3 no-print">
        <Col lg={12}>
          <TrackersSelector />
        </Col>
      </Row>

      <TrackerActivities />
    </Container>
  );
});

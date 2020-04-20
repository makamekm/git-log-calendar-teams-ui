/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { observer } from "mobx-react";

import { Container, Row, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { TotalCommitsPanel } from "./TotalCommitsPanel";
import { TotalChangedLinesPanel } from "./TotalChangedLinesPanel";
import { TopProjectsPanel } from "./TopProjectsPanel";
import { TopDevelopersPanel } from "./TopDevelopersPanel";
import { AllStatsPanel } from "./AllStatsPanel";
import { DashboardToolbar } from "./DashboardToolbar";
import { DashboardService } from "./DashboardService";
import { TrackersSelector } from "./TrackerSelector";
import { TrackerActivities } from "./TrackerActivities";

export const Dashboard = observer(() => {
  const state = React.useContext(DashboardService);

  return (
    <Container>
      <Row className="mb-5">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-4 pb-2">
            <HeaderMain title="Dashboard" className="mt-0 mb-3" />
            <DashboardToolbar state={state} />
          </div>
        </Col>
        <Col lg={3}>
          <TotalCommitsPanel
            valueToday={3267}
            valueLimited={9091}
            limit={state.limit}
          />
          <TotalChangedLinesPanel
            valueToday={3267}
            valueLimited={9091}
            limit={state.limit}
          />
        </Col>
        <Col lg={3} md={6}>
          <TopProjectsPanel />
        </Col>
        <Col lg={3} md={6}>
          <TopDevelopersPanel />
        </Col>
        <Col lg={3}>
          <AllStatsPanel />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={12}>
          <TrackersSelector />
        </Col>
      </Row>

      <TrackerActivities />
    </Container>
  );
});

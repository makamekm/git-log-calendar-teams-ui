import React from "react";
import { observer } from "mobx-react";
import { Instagram } from "react-content-loader";

import { Container, Row, Col, Card, CardBody, CardTitle } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { CalendarActivities } from "./CalendarActivities";
import { useOnLoad } from "~/hooks";
import { TotalCommitsPanel } from "./TotalCommitsPanel";
import { TotalChangedLinesPanel } from "./TotalChangedLinesPanel";
import { TopProjectsPanel } from "./TopProjectsPanel";
import { TopDevelopersPanel } from "./TopDevelopersPanel";
import { AllStatsPanel } from "./AllStatsPanel";
import { DashboardToolbar } from "./DashboardToolbar";
import { DashboardState, DashboardService } from "./DashboardService";

const TeamActivitiesCalendars = observer(
  ({ state }: { state: DashboardState }) => {
    return (
      <>
        {state.config &&
          state.config.teams &&
          state.config.teams.map((team) => {
            return (
              <Row key={team.name}>
                <Col lg={12}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle className="mb-0 d-flex">
                        <h6>
                          Calendar Team Activity for{" "}
                          <strong>{team.name}</strong>
                        </h6>
                      </CardTitle>
                      <div className="d-flex justify-content-center">
                        {state.isLoadingDelay ? (
                          <Instagram height={"300px"} />
                        ) : (
                          state.teamStats[team.name] && (
                            <CalendarActivities
                              height={"200px"}
                              data={state.teamStats[team.name]}
                              limit={state.limit}
                            />
                          )
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          })}
      </>
    );
  }
);

export const Dashboard = observer(() => {
  const state = React.useContext(DashboardService);
  useOnLoad(state.load);

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
      <TeamActivitiesCalendars state={state} />
    </Container>
  );
});

import React from "react";
import { useLocalStore, observer } from "mobx-react";
import { Instagram } from "react-content-loader";

import { Container, Row, Col, Card, CardBody, CardTitle } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { ipc } from "~/shared/ipc";
import { CalendarActivities } from "./CalendarActivities";
import { useDelay, useOnChange, useOnLoad } from "~/hooks";
import { TotalCommitsPanel } from "./TotalCommitsPanel";
import { TotalChangedLinesPanel } from "./TotalChangedLinesPanel";
import { TopProjectsPanel } from "./TopProjectsPanel";
import { TopDevelopersPanel } from "./TopDevelopersPanel";
import { AllStatsPanel } from "./AllStatsPanel";
import { DashboardState } from "./DashboardInterface";
import { DashboardToolbar } from "./DashboardToolbar";

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
  const state = useLocalStore<DashboardState>(() => ({
    config: null,
    teamStats: {},
    isLoading: false,
    isLoadingDelay: false,
    limit: 30,
    load: async () => {
      state.isLoading = true;
      state.config = await ipc.handlers.GET_CONFIG();
      const data = await ipc.handlers.GET_CALENDAR_DATA(state.limit);
      const prepearedData = Object.keys(data).reduce((map, team) => {
        map[team] = Object.keys(data[team]).map((day) => ({
          day,
          value: data[team][day],
        }));
        return map;
      }, {});
      state.teamStats = prepearedData;
      state.isLoading = false;
    },
  }));

  useOnLoad(state.load);
  useOnChange(state, "limit", state.load);
  useDelay(state, "isLoading", "isLoadingDelay");

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

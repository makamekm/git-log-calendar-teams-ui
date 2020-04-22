import React from "react";
import { observer } from "mobx-react";

import {
  Container,
  Row,
  Col,
  WithLayoutMeta,
  Card,
  CardBody,
  CardTitle,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { DashboardService } from "../Dashboard/DashboardService";
import { useParams } from "react-router";
import { useOnLoad } from "~/hooks";
import { DashboardToolbar } from "../Dashboard/DashboardToolbar";
import { TopPanel } from "../Dashboard/TopPanel";
import { periods } from "../Dashboard/Periods";
import { TotalChangedLinesPanel } from "../Dashboard/TotalChangedLinesPanel";
import { TotalCommitsPanel } from "../Dashboard/TotalCommitsPanel";
import { ActiveStatsPanel } from "../Dashboard/ActiveStatsPanel";
import { CalendarActivities } from "../Dashboard/CalendarActivities";
import { Instagram } from "react-content-loader";
import { HeaderSection } from "../HeaderSection";
import { Link } from "react-router-dom";

export const UserDashboard = observer(() => {
  const { userName } = useParams();
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = "user";
    state.name = userName;
    state.load();
  }, [state, userName]);
  useOnLoad(onLoad);

  return (
    <Container>
      <WithLayoutMeta
        meta={{
          pageTitle: `${userName} #user`,
          breadcrumbs: [
            {
              name: "Dashboard",
              url: "/dashboard",
            },
            {
              name: `${userName} #user`,
            },
          ],
        }}
      />
      <Row className="mb-5">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-3">
            <HeaderMain
              title={
                <>
                  {userName} <small>#user</small>
                </>
              }
              className="mt-0 mb-3"
            />
            <DashboardToolbar state={state} />
          </div>
        </Col>
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
            activeRepositories={state.stats?.stats.activeRepositories?.value}
            activeTeams={state.stats?.stats.activeTeams?.value}
            activeRepositoriesToday={
              state.stats?.stats.activeRepositories?.todayValue
            }
            activeTeamsToday={state.stats?.stats.activeTeams?.todayValue}
            limit={state.limit}
          />
        </Col>
        <Col lg={4} md={12}>
          <TopPanel
            className="mt-4"
            name={`Repositories ${periods[state.limit]}`}
            data={state.stats?.topRepositories?.value}
          />
          <TopPanel
            className="mt-4"
            name={`Teams ${periods[state.limit]}`}
            colorShift={2}
            data={state.stats?.topTeams?.value}
          />
        </Col>
        <Col lg={4} md={12}>
          <TopPanel
            className="mt-4"
            name="Repositories Today"
            data={state.stats?.topRepositories?.todayValue}
          />
          <TopPanel
            className="mt-4"
            name="Teams Today"
            colorShift={2}
            data={state.stats?.topTeams?.todayValue}
          />
        </Col>
      </Row>

      <HeaderSection no={1} title="Overall" subTitle="Calendar Activity" />

      <Card className="mb-3">
        <CardBody>
          <div className="d-flex">
            <CardTitle tag="h6">
              <span>
                <strong>{userName}</strong>
              </span>
              <span className="small ml-1 text-muted">#user</span>
            </CardTitle>
          </div>
          <div className="d-flex justify-content-center">
            {state.isLoadingDelay || !state.userStats[userName] ? (
              <Instagram height={"300px"} />
            ) : (
              <CalendarActivities
                maxValue={state.maxValue}
                height={200}
                limit={state.limit}
                data={state.userStats[userName]}
              />
            )}
          </div>
        </CardBody>
      </Card>

      {state.teams.length > 0 && (
        <HeaderSection
          no={2}
          title="User Teams Stats"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {state.teams.map((team, index) => (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                <Link to={`/team/${team}`}>
                  <i className="fa fa-link mr-1"></i>
                  <strong>{team}</strong>
                </Link>
                <span className="small ml-1 text-muted">#team</span>
              </CardTitle>
            </div>
            <div className="d-flex justify-content-center">
              {state.isLoadingDelay ? (
                <Instagram height={"300px"} />
              ) : (
                <CalendarActivities
                  maxValue={state.maxValue}
                  height={200}
                  limit={state.limit}
                  data={state.teamStats[team] || []}
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}

      {state.repositories.length > 0 && (
        <HeaderSection
          no={2}
          title="User Repositories Stats"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {state.repositories.map((repository, index) => (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                <Link to={`/repository/${repository}`}>
                  <i className="fa fa-link mr-1"></i>
                  <strong>{repository}</strong>
                </Link>
                <span className="small ml-1 text-muted">#repository</span>
              </CardTitle>
            </div>
            <div className="d-flex justify-content-center">
              {state.isLoadingDelay ? (
                <Instagram height={"300px"} />
              ) : (
                <CalendarActivities
                  maxValue={state.maxValue}
                  height={200}
                  limit={state.limit}
                  data={state.repositoriesStats[repository] || []}
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
});
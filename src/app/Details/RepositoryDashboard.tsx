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

export const RepositoryDashboard = observer(() => {
  const { repositoryName } = useParams();
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = "repository";
    state.name = repositoryName;
    state.load();
  }, [state, repositoryName]);
  useOnLoad(onLoad);

  return (
    <Container>
      <WithLayoutMeta
        meta={{
          pageTitle: `${repositoryName} #repository`,
          breadcrumbs: [
            {
              name: "Dashboard",
              url: "/dashboard",
            },
            {
              name: `${repositoryName} #repository`,
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
                  {repositoryName} <small>#repository</small>
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
            activeUsers={state.stats?.stats.activeUsers?.value}
            activeTeams={state.stats?.stats.activeTeams?.value}
            activeUsersToday={state.stats?.stats.activeUsers?.todayValue}
            activeTeamsToday={state.stats?.stats.activeTeams?.todayValue}
            limit={state.limit}
          />
        </Col>
        <Col lg={4} md={12}>
          <TopPanel
            className="mt-4"
            name={`Users ${periods[state.limit]}`}
            data={state.stats?.topUsers?.value}
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
            name="Users Today"
            data={state.stats?.topUsers?.todayValue}
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
                <strong>{repositoryName}</strong>
              </span>
              <span className="small ml-1 text-muted">#repository</span>
            </CardTitle>
          </div>
          <div className="d-flex justify-content-center">
            {state.isLoadingDelay ||
            !state.repositoriesStats[repositoryName] ? (
              <Instagram height={"300px"} />
            ) : (
              <CalendarActivities
                maxValue={state.maxValue}
                height={200}
                limit={state.limit}
                data={state.repositoriesStats[repositoryName]}
              />
            )}
          </div>
        </CardBody>
      </Card>

      {state.teams.length > 0 && (
        <HeaderSection
          no={2}
          title="Repoitory Teams Stats"
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

      {state.users.length > 0 && (
        <HeaderSection
          no={2}
          title="Repoitory User Stats"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {state.users.map((user, index) => (
        <Card className="mb-3" key={index}>
          <CardBody>
            <div className="d-flex">
              <CardTitle tag="h6">
                <Link to={`/user/${user}`}>
                  <i className="fa fa-link mr-1"></i>
                  <strong>{user}</strong>
                </Link>
                <span className="small ml-1 text-muted">#user</span>
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
                  data={state.userStats[user] || []}
                />
              )}
            </div>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
});
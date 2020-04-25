import React from "react";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Link } from "react-router-dom";

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
import { DashboardService } from "../DashboardService";
import { useParams } from "react-router";
import { useOnLoad } from "~/hooks";
import { DashboardToolbar } from "../Dashboard/DashboardToolbar";
import { TopPanel } from "../Dashboard/TopPanel";
import { periods } from "../Dashboard/Periods";
import { TotalChangedLinesPanel } from "../Dashboard/TotalChangedLinesPanel";
import { TotalCommitsPanel } from "../Dashboard/TotalCommitsPanel";
import { ActiveStatsPanel } from "../Dashboard/ActiveStatsPanel";
import { CalendarActivities } from "../Dashboard/CalendarActivities";
import { HeaderSection } from "../HeaderSection";
import { LatestMessages } from "./LastMessages";
import { BarActivities } from "../Dashboard/BarActivities";

export const TeamDashboard = observer(() => {
  const { teamName } = useParams();
  const state = React.useContext(DashboardService);
  const onLoad = React.useCallback(() => {
    state.mode = "team";
    state.name = teamName;
    state.load();
  }, [state, teamName]);
  useOnLoad(onLoad);

  return (
    <Container>
      <WithLayoutMeta
        meta={{
          pageTitle: `${teamName} #team`,
          breadcrumbs: [
            {
              name: "Dashboard",
              url: "/dashboard",
            },
            {
              name: "Team",
            },
            {
              name: `${teamName}`,
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
                  {teamName} <small>#team</small>
                </>
              }
              className="mt-0 mb-3"
            />
            <DashboardToolbar state={state} />
          </div>
        </Col>
        {state.isLoadingDelay ? (
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
                activeUsers={state.stats?.stats.activeUsers?.value}
                activeRepositoriesToday={
                  state.stats?.stats.activeRepositories?.todayValue
                }
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
                type="user"
                name="Users Today"
                colorShift={2}
                data={state.stats?.topUsers?.todayValue}
              />
            </Col>
          </>
        )}
      </Row>

      <LatestMessages />

      <HeaderSection
        no={"Overall"}
        title="All Stats"
        subTitle="Calendar Activity"
      />

      <Card className="no-print-break mb-3">
        <CardBody>
          <div className="d-flex">
            <CardTitle tag="h6">
              <span>
                <strong>{teamName}</strong>
              </span>
              <span className="small ml-1 text-muted">#team</span>
            </CardTitle>
          </div>
          <div>
            {state.isLoadingDelay ? (
              <List height={"300px"} />
            ) : (
              <>
                <CalendarActivities
                  maxValue={state.maxValue}
                  height={200}
                  limit={state.limit}
                  data={state.teamStats[teamName] || []}
                />
                <BarActivities
                  height={300}
                  data={state.teamStats[teamName] || []}
                />
              </>
            )}
          </div>
        </CardBody>
      </Card>

      {state.users.length > 0 && (
        <HeaderSection
          no={"Users"}
          title="Team Stats"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {state.users.map((user, index) => (
        <Card className="no-print-break mb-3" key={index}>
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
            <div>
              {state.isLoadingDelay ? (
                <List height={"300px"} />
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

      {state.repositories.length > 0 && (
        <HeaderSection
          no={"Repositories"}
          title="Team Stats"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {state.repositories.map((repository, index) => (
        <Card className="no-print-break mb-3" key={index}>
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
            <div>
              {state.isLoadingDelay ? (
                <List height={"300px"} />
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

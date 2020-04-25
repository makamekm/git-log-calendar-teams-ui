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
  Accordion,
  AccordionHeader,
  AccordionBody,
  Table,
  Input,
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
import { numberWithCommas } from "~/tools";
import { LatestMessages } from "./LastMessages";
import { RepositoryUserService } from "../RepositoryUserService";
import { BarActivities } from "../Dashboard/BarActivities";

const RepositoryUsers = observer(() => {
  const state = React.useContext(RepositoryUserService);
  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      state.usersQuery = e.currentTarget.value;
    },
    [state]
  );
  return (
    <Accordion className="mb-3">
      <AccordionHeader className="h6 cursor-pointer">
        <div className="d-flex justify-content-center align-items-center">
          <div>Repository Users</div>
          <div style={{ flex: 1 }}>
            <Input
              style={{ width: "150px" }}
              outline
              placeholder="Search..."
              bsSize="sm"
              className="ml-auto align-self-end no-print"
              onClick={(e) => e.stopPropagation()}
              value={state.usersQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody className="p-0">
        {state.isLoadingDelay ? (
          <List className="m-4" height="200px" width="100%" />
        ) : (
          <Table
            striped
            className="mb-0"
            style={{ maxWidth: "100%" }}
            responsive
          >
            <thead>
              <tr>
                <th className="bt-0">#</th>
                <th className="bt-0">Key</th>
                <th className="bt-0">Name</th>
                <th className="bt-0">Email</th>
                <th className="text-right bt-0">Activity</th>
                <th className="text-right bt-0">Total Activity</th>
              </tr>
            </thead>
            <tbody>
              {state.tableRepositoryUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="align-middle">{index + 1}.</td>
                    <td className="align-middle">
                      {user.user ? (
                        <Link to={`/user/${user.user.name}`}>
                          {user.user.name}
                        </Link>
                      ) : (
                        <Link to={`/user/${user.userKey}`}>{user.userKey}</Link>
                      )}
                    </td>
                    <td className="align-middle">{user.name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="text-right align-middle">
                      {numberWithCommas(user.value)}
                    </td>
                    <td className="text-right align-middle">
                      {numberWithCommas(user.valueTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </AccordionBody>
    </Accordion>
  );
});

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
              name: "Repository",
            },
            {
              name: `${repositoryName}`,
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
                type="user"
                name={`Users ${periods[state.limit]}`}
                data={state.stats?.topUsers?.value}
              />
              <TopPanel
                className="mt-4"
                type="team"
                name={`Teams ${periods[state.limit]}`}
                colorShift={2}
                data={state.stats?.topTeams?.value}
              />
            </Col>
            <Col lg={4} md={12}>
              <TopPanel
                className="mt-4"
                type="user"
                name="Users Today"
                data={state.stats?.topUsers?.todayValue}
              />
              <TopPanel
                className="mt-4"
                type="team"
                name="Teams Today"
                colorShift={2}
                data={state.stats?.topTeams?.todayValue}
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
                <strong>{repositoryName}</strong>
              </span>
              <span className="small ml-1 text-muted">#repository</span>
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
                  data={state.repositoriesStats[repositoryName] || []}
                />
                <BarActivities
                  height={250}
                  limit={state.limit}
                  data={state.repositoriesStats[repositoryName] || []}
                />
              </>
            )}
          </div>
        </CardBody>
      </Card>

      {state.teams.length > 0 && (
        <HeaderSection
          no={"Teams"}
          title="Repository Stats"
          subTitle="Calendar Activity"
          className="mt-5"
        />
      )}

      {state.teams.map((team, index) => (
        <Card className="no-print-break mb-3" key={index}>
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
            <div>
              {state.isLoadingDelay ? (
                <List height={"300px"} />
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
          no={"Users"}
          title="Repository Stats"
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

      <RepositoryUsers />
    </Container>
  );
});

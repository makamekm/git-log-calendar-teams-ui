import React from "react";
import { reaction } from "mobx";
import { useLocalStore, observer } from "mobx-react";
import { Instagram } from "react-content-loader";
import moment from "moment";
import { debounce } from "underscore";

import {
  Container,
  Row,
  Col,
  Media,
  Table,
  Badge,
  Card,
  CardBody,
  CardTitle,
  ButtonToolbar,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { TinyDonutChart } from "~/wip/ProjectsDashboards/TinyDonutChart";
import { TinyDonutChartAllProjects } from "~/wip/ProjectsDashboards/TinyDonutChartAllProjects";
import { ipc } from "~/shared/ipc";
import { CalendarActivities } from "./CalendarActivities";
import { Config } from "~/shared/Config";
import { useDelay } from "~/hooks";

interface DashboardState {
  config: Config;
  teamStats: {
    [team: string]: {
      day: string;
      value: number;
    }[];
  };
  isLoading: boolean;
  isLoadingDelay: boolean;
  limit: number;
  load: () => Promise<void>;
}

const periods = {
  30: "Last Month",
  90: "Last 3 Months",
  180: "Last 6 Months",
  360: "Last Year",
};

// const numberWithCommas = (x: number) => {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const PeriodValues = observer(({ state }: { state: DashboardState }) => {
  return (
    <>
      {Object.keys(periods).map((key: any) => {
        key = Number(key);
        return (
          <DropdownItem
            key={key}
            active={state.limit === key}
            onClick={() => {
              state.limit = key;
            }}
          >
            {periods[key]}
          </DropdownItem>
        );
      })}
    </>
  );
});

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

  React.useEffect(
    () =>
      reaction(
        () => [state.limit],
        debounce(() => {
          state.load();
        }, 100)
      ),
    [state]
  );

  React.useEffect(() => {
    state.load();
  }, [state]);

  useDelay(state, "isLoading", "isLoadingDelay");

  const now = moment().format("YYYY/MM/DD");
  const past = moment().subtract(state.limit, "days").format("YYYY/MM/DD");

  return (
    <Container>
      <Row className="mb-5">
        <Col lg={12}>
          <div className="d-flex flex-wrap mb-4 pb-2">
            <HeaderMain title="Dashboard" className="mt-0 mb-3" />
            <ButtonToolbar className="ml-auto">
              <ButtonGroup className="align-self-start mr-2 mt-0 mb-3">
                <UncontrolledButtonDropdown className="ml-auto flex-column">
                  <DropdownToggle
                    color="link"
                    className="text-right pl-0 text-decoration-none mb-2"
                  >
                    <i className="fa fa-calendar-o text-body mr-2"></i>
                    {periods[state.limit]}
                    <i className="fa fa-angle-down text-body ml-2" />
                  </DropdownToggle>
                  <div className="small">
                    {past} to {now}
                  </div>
                  <DropdownMenu>
                    <DropdownItem header>Select Period:</DropdownItem>
                    <PeriodValues state={state} />
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </Col>
        <Col lg={3}>
          <div className="hr-text hr-text-center my-2">
            <span>Commits</span>
          </div>
          <Row>
            <Col xs={6} className="text-center">
              <p className="text-center mb-0">
                <i className="fa fa-circle text-primary mr-2"></i>
                Today
              </p>
              <h4 className="mt-2 mb-0">3,267</h4>
            </Col>
            <Col xs={6} className="text-center">
              <p className="text-center mb-0">
                <i className="fa fa-circle text-info mr-2"></i>
                {periods[state.limit]}
              </p>
              <h4 className="mt-2 mb-0">8,091</h4>
            </Col>
          </Row>
          <div className="hr-text hr-text-center mb-2 mt-3">
            <span>Line Changes</span>
          </div>
          <Row className="mb-4 mb-xl-0">
            <Col xs={6} className="text-center">
              <p className="text-center mb-0">
                <i className="fa fa-circle text-warning mr-2"></i>
                Today
              </p>
              <h4 className="mt-2 mb-0">4,007</h4>
            </Col>
            <Col xs={6} className="text-center">
              <p className="text-center mb-0">
                <i className="fa fa-circle text-danger mr-2"></i>
                {periods[state.limit]}
              </p>
              <h4 className="mt-2 mb-0">11,091</h4>
            </Col>
          </Row>
        </Col>
        <Col lg={3} md={6}>
          <div className="hr-text hr-text-left my-2">
            <span>Top 4 Projects</span>
          </div>
          <Media>
            <Media left className="mr-3">
              <TinyDonutChart />
            </Media>
            <Media body>
              <div>
                <i className="fa fa-circle mr-1 text-yellow"></i>
                <span className="text-inverse">23</span> Pending
              </div>
              <div>
                <i className="fa fa-circle mr-1 text-danger"></i>
                <span className="text-inverse">3</span> Behind
              </div>
              <div>
                <i className="fa fa-circle mr-1 text-success"></i>
                <span className="text-inverse">34</span> Completed
              </div>
              <div>
                <i className="fa fa-circle mr-1 text-primary"></i>
                <span className="text-inverse">24</span> Behind
              </div>
            </Media>
          </Media>
        </Col>

        <Col lg={3} md={6} className="mb-4 mb-lg-0">
          <div className="hr-text hr-text-left my-2">
            <span>Top 4 Developers</span>
          </div>
          <Media>
            <Media left className="mr-3">
              <TinyDonutChartAllProjects />
            </Media>
            <Media body>
              <div>
                <i className="fa fa-circle mr-1 text-info"></i>
                <span className="text-inverse">14</span> Pending
              </div>
              <div>
                <i className="fa fa-circle mr-1 text-primary"></i>
                <span className="text-inverse">24</span> Behind
              </div>
              <div>
                <i className="fa fa-circle mr-1 text-purple"></i>
                <span className="text-inverse">2</span> Completed
              </div>
              <div>
                <i className="fa fa-circle mr-1 text-red"></i>
                <span className="text-inverse">2</span> Completed
              </div>
            </Media>
          </Media>
        </Col>
        <Col lg={3}>
          <div className="hr-text hr-text-left my-2">
            <span>All Stats</span>
          </div>
          <Table size="sm">
            <tbody>
              <tr>
                <td className="text-inverse bt-0">Active Projects</td>
                <td className="text-right bt-0">
                  <Badge color="success" pill>
                    6
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="text-inverse">Active Teams</td>
                <td className="text-right">
                  <Badge color="primary" pill>
                    4
                  </Badge>
                </td>
              </tr>
              <tr>
                <td className="text-inverse">Active Developers</td>
                <td className="text-right">
                  <Badge color="info" pill>
                    15
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <TeamActivitiesCalendars state={state} />
    </Container>
  );
});

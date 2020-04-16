import React from "react";
import faker from "faker/locale/en_US";

import { Container, Row, Col, Media, Table, Badge } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { TinyDonutChart } from "~/wip/ProjectsDashboards/TinyDonutChart";
import { TinyDonutChartAllProjects } from "~/wip/ProjectsDashboards/TinyDonutChartAllProjects";

export const Dashboard = () => (
  <Container>
    <Row className="mb-5">
      <Col lg={12}>
        <HeaderMain title="Projects" className="mb-4 mb-lg-5" />
        <p>{faker.lorem.paragraph()}</p>
      </Col>
      <Col lg={3}>
        <div className="hr-text hr-text-center my-2">
          <span>Payments</span>
        </div>
        <Row>
          <Col xs={6} className="text-center">
            <p className="text-center mb-0">
              <i className="fa fa-circle text-primary mr-2"></i>
              Today
            </p>
            <h4 className="mt-2 mb-0">$3,267</h4>
          </Col>
          <Col xs={6} className="text-center">
            <p className="text-center mb-0">
              <i className="fa fa-circle text-info mr-2"></i>
              This Month
            </p>
            <h4 className="mt-2 mb-0">$8,091</h4>
          </Col>
        </Row>
        <div className="hr-text hr-text-center mb-2 mt-3">
          <span>Invoices</span>
        </div>
        <Row className="mb-4 mb-xl-0">
          <Col xs={6} className="text-center">
            <p className="text-center mb-0">
              <i className="fa fa-circle text-warning mr-2"></i>
              Due
            </p>
            <h4 className="mt-2 mb-0">$4,007</h4>
          </Col>
          <Col xs={6} className="text-center">
            <p className="text-center mb-0">
              <i className="fa fa-circle text-danger mr-2"></i>
              Overdue
            </p>
            <h4 className="mt-2 mb-0">$11,091</h4>
          </Col>
        </Row>
      </Col>
      <Col lg={3} md={6}>
        <div className="hr-text hr-text-left my-2">
          <span>All Tasks</span>
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
          </Media>
        </Media>
      </Col>
      <Col lg={3} md={6} className="mb-4 mb-lg-0">
        <div className="hr-text hr-text-left my-2">
          <span>All Projects</span>
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
          </Media>
        </Media>
      </Col>
      <Col lg={3}>
        <div className="hr-text hr-text-left my-2">
          <span>My Stats</span>
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
              <td className="text-inverse">Open Tasks</td>
              <td className="text-right">
                <Badge color="primary" pill>
                  4
                </Badge>
              </td>
            </tr>
            <tr>
              <td className="text-inverse">Support Tickets</td>
              <td className="text-right">
                <Badge color="info" pill>
                  15
                </Badge>
              </td>
            </tr>
            <tr>
              <td className="text-inverse">Active Timers</td>
              <td className="text-right">
                <Badge color="secondary" pill>
                  0
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>
);

import React from "react";
import faker from "faker/locale/en_US";

import { TinyAreaChart } from "../../Graphs/ReCharts/components/TinyAreaChart";
import { Row, Col } from "reactstrap";

const WebsitePerformance = (props: {
  title?: any;
  value?: any;
  valuePercentColor?: any;
  valuePercentIcon?: any;
  valuePercent?: any;
}) => (
  <React.Fragment>
    <Row noGutters className="flex-column-reverse flex-md-row flex-nowrap">
      <Col
        sm={12}
        md="auto"
        className="d-flex align-items-start flex-column flex-fill"
      >
        <h6 className="mb-auto d-none d-md-block text-md-left">
          {props.title}
        </h6>
        <TinyAreaChart />
      </Col>
      <Col sm={12} md="auto" className="text-center text-md-right pl-md-2">
        <h2>{props.value}</h2>
        <div className={`mb-1 ${props.valuePercentColor}`}>
          <i className={`fa mr-1 fa-${props.valuePercentIcon}`}></i>
          {props.valuePercent}%
        </div>
        <div>
          vs {faker.finance.amount()} <i>(prev.)</i>
        </div>
      </Col>
    </Row>
  </React.Fragment>
);

WebsitePerformance.defaultProps = {
  title: "Title",
  value: "00.000",
  valuePercentColor: "text-muted",
  valuePercentIcon: "caret-down",
  valuePercent: "00,00",
};

export { WebsitePerformance };

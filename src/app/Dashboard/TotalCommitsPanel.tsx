import React from "react";
import { Row, Col } from "~/components";
import { periods } from "./Periods";
import { numberWithCommas } from "~/tools";

export const TotalCommitsPanel = ({
  valueToday,
  valueLimited,
  limit,
  className,
}: {
  className?: string;
  valueToday: number;
  valueLimited: number;
  limit: number;
}) => {
  return (
    <div className={className}>
      <div className="hr-text hr-text-center my-2">
        <span>Commits</span>
      </div>
      <Row>
        <Col xs={6} className="text-center">
          <p className="text-center mb-0">
            <i className="fa fa-circle text-primary mr-2"></i>
            Today
          </p>
          <h4 className="mt-2 mb-0">{numberWithCommas(valueToday)}</h4>
        </Col>
        <Col xs={6} className="text-center">
          <p className="text-center mb-0">
            <i className="fa fa-circle text-info mr-2"></i>
            {periods[limit]}
          </p>
          <h4 className="mt-2 mb-0">{numberWithCommas(valueLimited)}</h4>
        </Col>
      </Row>
    </div>
  );
};

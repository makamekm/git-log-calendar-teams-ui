import React from "react";
import { Row, Col } from "~/components";
import { periods } from "./Periods";
import { numberWithCommas } from "~/tools";

export const TotalChangedLinesPanel = ({
  valueToday,
  valueLimited,
  limit,
}: {
  valueToday: number;
  valueLimited: number;
  limit: number;
}) => {
  return (
    <>
      <div className="hr-text hr-text-center mb-2 mt-3">
        <span>Line Changes</span>
      </div>
      <Row className="mb-4 mb-xl-0">
        <Col xs={6} className="text-center">
          <p className="text-center mb-0">
            <i className="fa fa-circle text-warning mr-2"></i>
            Today
          </p>
          <h4 className="mt-2 mb-0">{numberWithCommas(valueToday)}</h4>
        </Col>
        <Col xs={6} className="text-center">
          <p className="text-center mb-0">
            <i className="fa fa-circle text-danger mr-2"></i>
            {periods[limit]}
          </p>
          <h4 className="mt-2 mb-0">{numberWithCommas(valueLimited)}</h4>
        </Col>
      </Row>
    </>
  );
};

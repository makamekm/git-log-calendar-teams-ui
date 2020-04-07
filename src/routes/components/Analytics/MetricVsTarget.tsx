import React from "react";
import { Progress } from "../../../components/Progress/Progress";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

const MetricVsTarget = (props: {
  title?: any;
  value?: any;
  progressbarValue?: string;
  progressbarColor?: any;
  targetValue?: any;
}) => (
  <React.Fragment>
    <h2 className="pt-4 pb-2">{props.value}</h2>
    <Progress
      value={`${props.progressbarValue}`}
      color={`${props.progressbarColor}`}
      className="mb-2"
      style={{ height: "5px" }}
    />
    <div className="mb-3">Target: {props.targetValue}</div>
    <InputGroup className="mb-1">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>Daily Target:</InputGroupText>
      </InputGroupAddon>
      <Input placeholder="Enter..." />
    </InputGroup>
  </React.Fragment>
);

MetricVsTarget.defaultProps = {
  title: "Title",
  value: "000.000",
  progressbarValue: "24",
  progressbarColor: "secondary",
  targetValue: "000.000",
};

export { MetricVsTarget };

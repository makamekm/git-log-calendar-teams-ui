import React from "react";

const SessionsByDevice = (props: {
  title?: any;
  titlePercentColor?: any;
  valuePercent?: string;
  valuePercentColor?: any;
  value?: any;
  valueColor?: any;
}) => (
  <React.Fragment>
    <div className={`mb-2 ${props.valuePercentColor}`}>{props.title}</div>
    <h2 className={`${props.valuePercentColor}`}>{props.valuePercent}%</h2>
    <div className={`mb-3 ${props.valueColor}`}>{props.value}</div>
  </React.Fragment>
);

SessionsByDevice.defaultProps = {
  title: "Title",
  titlePercentColor: "text-inverse",
  valuePercent: "00,0",
  valuePercentColor: "text-muted",
  value: "000,000",
  valueColor: "text-muted",
};

export { SessionsByDevice };

import React from "react";

import { TinyDonutChart } from "./TinyDonutChart";
import { TinyBarChart } from "./TinyBarChart";

import { randomArray } from "~/utilities";
import { CardBody, Badge, Card } from "@lib";

const percents = [
  "15",
  "25",
  "30",
  "35",
  "40",
  "45",
  "55",
  "60",
  "75",
  "80",
  "95",
];

const caret = ["down", "up"];

const CardSystem = (props: {
  title?: any;
  badgeColor?: string;
  unit?: any;
  pieColor?: string;
}) => (
  <Card className="mb-3 mb-lg-0">
    <CardBody className="pb-0">
      <div className="d-flex">
        <span>
          <Badge pill className="mb-3" color={props.badgeColor}>
            <i className={` fa fa-fw fa-caret-${randomArray(caret)}`} />
            {randomArray(percents)}%
          </Badge>
          <h6 className="mb-0">{props.title}</h6>
          <h2 className="mb-3">
            {randomArray(percents)} <small>{props.unit}</small>
          </h2>
        </span>
        <span className="text-right ml-auto">
          <TinyDonutChart pieColor={props.pieColor} />
        </span>
      </div>
      <TinyBarChart />
    </CardBody>
  </Card>
);

CardSystem.defaultProps = {
  title: "Waiting...",
  badgeColor: "secondary",
  unit: "%",
  pieColor: "500",
};

export { CardSystem };

import React from "react";
import faker from "faker/locale/en_US";
import { Badge } from "reactstrap";
import { Progress } from "../../../components/Progress/Progress";

const ProjectsList = (props: {
  title?: string;
  badgeColor?: string;
  badgeTitle?: string;
  progressValue?: string;
  completeValue?: string;
  myTasksValue?: string;
  daysDueValue?: string;
}) => (
  <React.Fragment>
    <div className="d-flex flex-column">
      <div className="mb-3 d-flex justify-content-between">
        <span className="mb-0 text-inverse">
          {props.title || faker.commerce.productName()}
        </span>
        <Badge color={`${props.badgeColor}`} pill className="align-self-center">
          {props.badgeTitle}
        </Badge>
      </div>
      <Progress
        value={`${props.progressValue}`}
        className="mb-4"
        style={{ height: "5px" }}
      />
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <h5 className="mb-1">{props.completeValue}%</h5>
          <span>Complete</span>
        </div>
        <div className="text-center">
          <h5 className="mb-1">{props.myTasksValue}</h5>
          <span>My Tasks</span>
        </div>
        <div className="text-center">
          <h5 className="mb-1">{props.daysDueValue}</h5>
          <span>Days Due</span>
        </div>
      </div>
    </div>
  </React.Fragment>
);

ProjectsList.defaultProps = {
  badgeColor: "secondary",
  badgeTitle: "Waiting",
  progressValue: "25",
  completeValue: "60",
  myTasksValue: "5",
  daysDueValue: "53",
};

export { ProjectsList };

import React from "react";
import { CardTitle, Badge } from "reactstrap";

const ProfileOverviewCard = (props: {
  title?: any;
  badgeColor?: string;
  badgeTitle?: any;
  value?: any;
  valueTitle?: any;
  footerTitle?: any;
  footerTitleClassName?: string;
  footerIcon?: string;
  footerValue?: any;
}) => (
  <React.Fragment>
    <div className="d-flex">
      <CardTitle tag="h6">{props.title}</CardTitle>
      <Badge
        pill
        color={`${props.badgeColor}`}
        className="align-self-start ml-auto"
      >
        {props.badgeTitle}
      </Badge>
    </div>
    <div className="text-center my-4">
      <h2>{props.value}</h2>
      <span>{props.valueTitle}</span>
    </div>
    <div className="d-flex">
      <span>{props.footerTitle}</span>
      <span className={`ml-auto ${props.footerTitleClassName}`}>
        <i className={`fa mr-1 fa-${props.footerIcon}`}></i>
        {props.footerValue}
      </span>
    </div>
  </React.Fragment>
);

ProfileOverviewCard.defaultProps = {
  title: "Waiting",
  badgeColor: "secondary",
  badgeTitle: "Waiting",
  value: "0.000",
  valueTitle: "Waiting",
  footerTitle: "Waiting",
  footerTitleClassName: "text-muted",
  footerIcon: "caret-down",
  footerValue: "0.00%",
};

export { ProfileOverviewCard };

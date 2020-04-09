import React from "react";
import faker from "faker/locale/en_US";
import { Media } from "~/components";

const Activity = (props: {
  iconColorBelow?: string;
  iconBelow?: string;
  iconColor?: string;
  icon?: string;
}) => (
  <React.Fragment>
    <Media>
      <Media left>
        <span className="fa-stack fa-lg fa-fw d-flex mr-3">
          <i
            className={`fa fa-fw fa-stack-2x fa-stack-2x text-${props.iconColorBelow} fa-${props.iconBelow}`}
          ></i>
          <i
            className={`fa fa-stack-1x fa-fw text-${props.iconColor} fa-${props.icon}`}
          ></i>
        </span>
      </Media>
      <Media body>
        <span className="h6">
          {faker.name.firstName()} {faker.name.lastName()}
        </span>{" "}
        changed Description to &quot;{faker.random.words()}&quot;
        <p className="mt-2 mb-1">{faker.lorem.sentence()}</p>
        <div className="small mt-2">{faker.date.past().toString()}</div>
      </Media>
    </Media>
  </React.Fragment>
);

Activity.defaultProps = {
  iconColorBelow: "muted",
  iconBelow: "circle",
  iconColor: "white",
  icon: "question",
};

export { Activity };

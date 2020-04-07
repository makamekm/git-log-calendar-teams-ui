import React from "react";
import _ from "lodash";
import classNames from "classnames";

const EmptyLayoutSection = (props: {
  className?: string;
  children: any;
  center?: boolean;
  width?: string | number;
}) => {
  const sectionClass = classNames(props.className, "fullscreen__section", {
    "fullscreen__section--center": props.center,
  });
  const maxWidth = _.isNumber(props.width) ? `${props.width}px` : props.width;
  return (
    <div className={sectionClass}>
      {props.center ? (
        <div className="fullscrenn__section__child" style={{ maxWidth }}>
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </div>
  );
};

EmptyLayoutSection.defaultProps = {
  width: "420px",
};

export { EmptyLayoutSection };

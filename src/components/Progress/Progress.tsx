import React from "react";
import classNames from "classnames";
import { Progress as BsProgress, ProgressProps } from "reactstrap";

import "./Progress.scss";

const Progress = (
  props: ProgressProps & {
    slim?: boolean;
    className?: string;
    children?: any;
  }
) => {
  const { children, slim, className, ...otherProps } = props;
  const progressClass = classNames(className, {
    slim,
  });

  return (
    <BsProgress className={progressClass} {...otherProps}>
      {!slim && children}
    </BsProgress>
  );
};

export { Progress };

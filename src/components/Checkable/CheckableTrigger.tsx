import React from "react";
import classNames from "classnames";

import { Consumer } from "./context";

import classes from "./CheckableTrigger.scss";

const CheckableTrigger = (
  props: {
    children?: any;
    className?: string;
    tag?: any;
  } & any
) => {
  const { children, tag, className, ...otherProps } = props;
  const Tag = tag;
  const tagClass = classNames(classes["checkable__trigger"], className);

  return (
    <Consumer>
      {(value) => (
        <Tag
          {...otherProps}
          className={tagClass}
          onClick={() => {
            value.toggle();
          }}
        >
          {children}
        </Tag>
      )}
    </Consumer>
  );
};

CheckableTrigger.defaultProps = {
  tag: "div",
};

export { CheckableTrigger };

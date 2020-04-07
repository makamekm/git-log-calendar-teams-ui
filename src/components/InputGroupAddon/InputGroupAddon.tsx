import React from "react";
import _ from "lodash";

import {
  InputGroupAddon as BsInputGroupAddon,
  InputGroupAddonProps,
} from "reactstrap";

const InputGroupAddon = (props: InputGroupAddonProps) => {
  const { children, ...otherProps } = props;
  const childArr = React.Children.toArray(children);
  const isFa = _.some(
    childArr,
    (child) =>
      React.isValidElement(child) &&
      child.props.className &&
      _.includes(child.props.className, "fa")
  );
  const isCheckRadio = _.some(
    childArr,
    (child) =>
      React.isValidElement(child) &&
      (child.props.type === "radio" || child.props.type === "checkbox")
  );

  let child =
    isFa || isCheckRadio ? (
      <div className="input-group-text">{children}</div>
    ) : (
      children
    );

  return <BsInputGroupAddon {...otherProps}>{child}</BsInputGroupAddon>;
};

InputGroupAddon.defaultProps = (BsInputGroupAddon as any).defaultProps;

export { InputGroupAddon };

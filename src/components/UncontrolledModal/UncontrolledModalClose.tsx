import React from "react";
import { Button } from "reactstrap";

import { Consumer } from "./context";

const UncontrolledModalClose = (props: { tag?: any }) => {
  const { tag, ...otherProps } = props;
  const Tag = tag;

  return (
    <Consumer>
      {(value) => <Tag {...otherProps} onClick={() => value.toggleModal()} />}
    </Consumer>
  );
};

UncontrolledModalClose.defaultProps = {
  tag: Button,
};

export { UncontrolledModalClose };

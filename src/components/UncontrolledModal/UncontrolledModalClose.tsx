import React from "react";
import { Button, ButtonProps } from "reactstrap";

import { Consumer } from "./context";

const UncontrolledModalClose = (
  props: {
    tag?: any;
    onClick?: () => Promise<boolean | void> | (boolean | void);
  } & ButtonProps
) => {
  const { tag, onClick, ...otherProps } = props;
  const Tag = tag;

  return (
    <Consumer>
      {(value) => (
        <Tag
          {...otherProps}
          onClick={async () => {
            const res = onClick && (await onClick());
            if (res !== false) {
              value.toggleModal();
            }
          }}
        />
      )}
    </Consumer>
  );
};

UncontrolledModalClose.defaultProps = {
  tag: Button,
};

export { UncontrolledModalClose };

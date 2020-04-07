import React from "react";
import classNames from "classnames";

import { AccordionConsumer } from "./context";

export const AccordionIndicator = (props: {
  open?: any;
  closed?: any;
  className?: string;
}) => (
  <AccordionConsumer>
    {({ isOpen }) =>
      isOpen
        ? React.cloneElement(props.open, {
            className: classNames(props.className, props.open.props.className),
          })
        : React.cloneElement(props.closed, {
            className: classNames(
              props.className,
              props.closed.props.className
            ),
          })
    }
  </AccordionConsumer>
);

AccordionIndicator.defaultProps = {
  open: <i className="fa fa-fw fa-minus"></i>,
  closed: <i className="fa fa-fw fa-plus"></i>,
};

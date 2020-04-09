import React from "react";
import classNames from "classnames";
import { Collapse, CardBody } from "reactstrap";

import { AccordionConsumer } from "./context";

export const AccordionBody = (props: {
  children?: any;
  className?: string;
}) => (
  <AccordionConsumer>
    {({ isOpen }) => (
      <Collapse isOpen={isOpen}>
        <CardBody className={classNames(props.className, "pt-0")}>
          {props.children}
        </CardBody>
      </Collapse>
    )}
  </AccordionConsumer>
);

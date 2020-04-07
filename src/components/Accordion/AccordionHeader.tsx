import React from "react";
import classNames from "classnames";

import { CardHeader } from "./../CardHeader/CardHeader";

import { AccordionConsumer } from "./context";
import classes from "./AccordionHeader.scss";

export const AccordionHeader = (props: {
  children?: any;
  onClick?: () => void;
  className?: string;
}) => (
  <AccordionConsumer>
    {({ onToggle }) => (
      <CardHeader
        className={classNames(props.className, classes.header)}
        onClick={onToggle}
      >
        {props.children}
      </CardHeader>
    )}
  </AccordionConsumer>
);

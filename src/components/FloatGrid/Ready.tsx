import React from "react";
import PropTypes from "prop-types";
import { FloatGridConsumer } from "./context";

export const Ready = ({ children }) => (
  <FloatGridConsumer>
    {({ gridReady }) => (gridReady ? children : null)}
  </FloatGridConsumer>
);
Ready.propTypes = {
  children: PropTypes.node,
};

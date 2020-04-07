import React from "react";
import { PolarAngleAxis as RCPolarAngleAxis } from "recharts";

import styleConfig from "./config";

export const PolarAngleAxis = (props) => {
  return React.createElement(RCPolarAngleAxis, {
    ...props,
    ...styleConfig.polarAngleAxis,
  });
};

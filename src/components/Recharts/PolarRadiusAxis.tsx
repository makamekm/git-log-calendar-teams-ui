import React from "react";
import { PolarRadiusAxis as RCPolarRadiusAxis } from "recharts";

import styleConfig from "./config";

export const PolarRadiusAxis = (props) => {
  return React.createElement(RCPolarRadiusAxis, {
    ...props,
    ...styleConfig.polarRadiusAxis,
  });
};

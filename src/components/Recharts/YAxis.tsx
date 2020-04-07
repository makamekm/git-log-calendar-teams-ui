import React from "react";
import { YAxis as RCYAxis } from "recharts";

import styleConfig from "./config";

export const YAxis = (props) => {
  return React.createElement(RCYAxis, { ...props, ...styleConfig.axis });
};

import React from "react";
import { Legend as RCLegend } from "recharts";

import styleConfig from "./config";

export const Legend = (props) => {
  return React.createElement(RCLegend, {
    ...props,
    ...styleConfig.legend,
  });
};

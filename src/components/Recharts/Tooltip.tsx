import React from "react";
import { Tooltip as RCTooltip } from "recharts";

import styleConfig from "./config";

export const Tooltip = (props) => {
  return React.createElement(RCTooltip, { ...props, ...styleConfig.tooltip });
};

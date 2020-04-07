import React from "react";
import { XAxis as RCXAxis } from "recharts";

import styleConfig from "./config";

export const XAxis = (props) => {
  return React.createElement(RCXAxis, { ...props, ...styleConfig.axis });
};

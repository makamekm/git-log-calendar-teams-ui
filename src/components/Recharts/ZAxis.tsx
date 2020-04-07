import React from "react";
import { ZAxis as RCZAxis } from "recharts";

import styleConfig from "./config";

export const ZAxis = (props) => {
  return React.createElement(RCZAxis, { ...props, ...styleConfig.axis });
};

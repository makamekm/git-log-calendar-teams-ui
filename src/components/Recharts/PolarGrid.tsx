import React from "react";
import { PolarGrid as RePolarGrid } from "recharts";

import styleConfig from "./config";

export const PolarGrid = (props) => {
  return React.createElement(RePolarGrid, {
    ...props,
    ...styleConfig.polarGrid,
  });
};

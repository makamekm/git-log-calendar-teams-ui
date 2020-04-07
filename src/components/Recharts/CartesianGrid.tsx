import React from "react";
import { CartesianGrid as ReCartesianGrid } from "recharts";

import styleConfig from "./config";

export const CartesianGrid = (props) => {
  return React.createElement(ReCartesianGrid, {
    ...props,
    ...styleConfig.grid,
  });
};

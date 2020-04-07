import React from "react";

import config from "./config";

export const ValueLabel = (props: {
  value?: number;
  x?: number;
  y?: number;
}) => (
  <text
    x={props.x}
    y={props.y - config.label.fontSize}
    textAnchor="middle"
    {...config.label}
  >
    {props.value}
  </text>
);

import React from "react";

import config from "./config";
import colors from "../../colors";

export const ValueLabel = (
  props: React.SVGProps<SVGTextElement> & {
    value?: number;
    x?: number;
    y?: number;
  }
) => (
  <text
    x={props.x}
    y={props.y - config.label.fontSize}
    textAnchor="middle"
    fontSize={11}
    fill={colors["900"]}
  >
    {props.value}
  </text>
);

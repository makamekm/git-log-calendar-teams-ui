import React from "react";

import {
  HolderTextProvider,
  HolderTextProviderProps,
} from "./HolderTextProvider";

const HolderIconProvider = (
  props: {
    className?: string;
    iconChar: string;
    children?: any;
  } & HolderTextProviderProps
) => {
  const { iconChar, children, ...otherProps } = props;
  return (
    <HolderTextProvider font="FontAwesome" text={iconChar} {...otherProps}>
      {children}
    </HolderTextProvider>
  );
};

export { HolderIconProvider };

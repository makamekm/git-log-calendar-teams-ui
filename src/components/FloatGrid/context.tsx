import React from "react";

const {
  Provider: FloatGridProvider,
  Consumer: FloatGridConsumer,
} = React.createContext<{
  gridUnitsToPx: (
    w: number,
    h: number
  ) => {
    wPx: number;
    hPx: number;
  };
  active: boolean;
  gridReady: boolean;
  setGridReady: () => void;
}>(null);

export { FloatGridProvider, FloatGridConsumer };

import React from "react";

export interface FloatGridContext {
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
}

const {
  Provider: FloatGridProvider,
  Consumer: FloatGridConsumer,
} = React.createContext<FloatGridContext>(null);

export function withFloatGridContextComponent<C extends React.ComponentClass>(
  Component: C
): C {
  const WithFloatGridContext = (props) => (
    <FloatGridConsumer>
      {(context) => <Component {...props} floatGridContext={context} />}
    </FloatGridConsumer>
  );
  return WithFloatGridContext as any;
}

export { FloatGridProvider, FloatGridConsumer };

import React from "react";

const { Provider, Consumer } = React.createContext<{
  isChecked: boolean;
  toggle: (enabled?: boolean) => void;
}>(null);

export { Provider, Consumer };

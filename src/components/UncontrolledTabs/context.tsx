import React from "react";

const { Provider, Consumer } = React.createContext<{
  setActiveTabId: (tabId: string) => void;
  activeTabId: string;
}>(null);

export { Provider, Consumer };

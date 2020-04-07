import React from "react";

import { Provider } from "./context";

class UncontrolledTabs extends React.Component<{
  children?: any;
  initialActiveTabId?: string;
}> {
  state = {
    activeTabId: this.props.initialActiveTabId || null,
  };

  render() {
    return (
      <Provider
        value={{
          setActiveTabId: (tabId) => {
            this.setState({ activeTabId: tabId });
          },
          activeTabId: this.state.activeTabId,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { UncontrolledTabs };

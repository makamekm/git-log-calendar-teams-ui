import React from "react";
import { TabContent, TabContentProps } from "reactstrap";

import { Consumer } from "./context";

const UncontrolledTabsTabContent = (props: TabContentProps) => (
  <Consumer>
    {(value) => <TabContent {...props} activeTab={value.activeTabId} />}
  </Consumer>
);

export { UncontrolledTabsTabContent };

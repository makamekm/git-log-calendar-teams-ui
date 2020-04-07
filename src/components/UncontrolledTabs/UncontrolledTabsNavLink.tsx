import React from "react";
import classNames from "classnames";
import _ from "lodash";
import { NavLink } from "reactstrap";

import { Consumer } from "./context";

const UncontrolledTabsNavLink = (props: { tabId?: string }) => (
  <Consumer>
    {(value) => (
      <NavLink
        {..._.omit(props, ["tabId"])}
        onClick={() => {
          value.setActiveTabId(props.tabId);
        }}
        className={classNames({ active: props.tabId === value.activeTabId })}
        // eslint-disable-next-line no-script-url
        href="javascript:;"
      />
    )}
  </Consumer>
);

export { UncontrolledTabsNavLink };

import React from "react";
import classNames from "classnames";
import { UncontrolledDropdown } from "reactstrap";

import { Provider } from "./context";

export class NestedDropdown extends React.Component<{
  tag?: any;
  className?: string;
  children?: any;
}> {
  static defaultProps = {
    tag: UncontrolledDropdown,
  };

  state: {
    openId: string;
  } = {
    openId: null,
  };

  handleOpen(targetId) {
    this.setState({
      openId: targetId,
    });
  }

  render() {
    const { tag: Tag, className, children, ...otherProps } = this.props;
    const dropdownClass = classNames(className, "nested-dropdown");

    return (
      <Tag {...otherProps} className={dropdownClass}>
        <Provider
          value={{
            openId: this.state.openId,
            onOpen: this.handleOpen.bind(this),
          }}
        >
          {children}
        </Provider>
      </Tag>
    );
  }
}

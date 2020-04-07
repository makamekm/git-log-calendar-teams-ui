import React from "react";

import { Provider } from "./context";

class Checkable extends React.Component<{
  children?: any;
  tag?: any;
}> {
  static defaultProps = {
    tag: "div",
  };

  state = {
    isChecked: false,
  };

  render() {
    const { tag, children, ...otherProps } = this.props;
    const Tag = this.props.tag;

    return (
      <Provider
        value={{
          isChecked: this.state.isChecked,
          toggle: (enabled) => {
            this.setState({ isChecked: enabled || !this.state.isChecked });
          },
        }}
      >
        <Tag {...otherProps}>{children}</Tag>
      </Provider>
    );
  }
}

export { Checkable };

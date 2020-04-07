import React from "react";
import { Input } from "reactstrap";

import { Consumer } from "./context";

class CheckableInput extends React.Component<{
  tag?: any;
  type?: string;
  defaultChecked?: boolean;
  toggle?: (state?: boolean) => void;
  isChecked?: boolean;
}> {
  static defaultProps = {
    tag: Input,
    type: "checkbox",
  };

  componentDidMount() {
    if (this.props.defaultChecked) {
      this.props.toggle(this.props.defaultChecked);
    }
  }

  render() {
    const { tag, isChecked, toggle, ...otherProps } = this.props;
    const Tag = tag;

    return (
      <Tag
        checked={isChecked}
        onChange={(e) => {
          toggle(e.target.checked);
        }}
        {...otherProps}
      />
    );
  }
}

const ContextCheckableInput = (props) => (
  <Consumer>
    {(value) => <CheckableInput {...{ ...props, ...value }} />}
  </Consumer>
);

export { ContextCheckableInput as CheckableInput };

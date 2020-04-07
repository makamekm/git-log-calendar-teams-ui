import React from "react";

import { Card } from "./../Card/Card";

import { AccordionProvider } from "./context";

export class Accordion extends React.Component<{
  initialOpen?: boolean;
  onToggle?: (open: boolean) => void;
  open?: boolean;
  children?: any;
  className?: string;
}> {
  state = {
    isOpen: this.props.initialOpen,
  };

  constructor(props) {
    super(props);

    if (props.open !== "undefined" && props.onToggle === "undefined") {
      // eslint-disable-next-line no-throw-literal
      throw (
        "Accordion: props.open has to be used combined with props.onToggle " +
        "use props.initialOpen to create an uncontrolled Accordion."
      );
    }
  }

  toggleHandler() {
    const { onToggle } = this.props;

    if (!onToggle) {
      this.setState({ isOpen: !this.state.isOpen });
    } else {
      onToggle(!this.props.open);
    }
  }

  isOpen() {
    return !this.props.onToggle ? this.state.isOpen : this.props.open;
  }

  render() {
    /* eslint-disable-next-line no-unused-vars */
    const { className, children, initialOpen, ...otherProps } = this.props;

    return (
      <AccordionProvider
        value={{
          onToggle: this.toggleHandler.bind(this),
          isOpen: this.isOpen(),
        }}
      >
        <Card className={className} {...otherProps}>
          {children}
        </Card>
      </AccordionProvider>
    );
  }
}

import React from "react";
import _ from "lodash";
import { Modal, ModalProps } from "reactstrap";

import { Provider } from "./context";

class UncontrolledModal extends React.Component<
  {
    target: string;
  } & ModalProps
> {
  state = {
    isOpen: false,
  };

  triggerElement: HTMLElement;

  componentDidMount() {
    if (typeof document !== "undefined") {
      this.triggerElement = document.querySelector(`#${this.props.target}`);

      if (!this.triggerElement) {
        // eslint-disable-next-line no-console
        console.error(
          "UncontrolledModal: 'target' element has not been found in the DOM via querySelector"
        );
        return;
      }

      this.triggerElement.addEventListener("click", this.clickEventHandler);
    }
  }

  componentWillUnmount() {
    if (this.triggerElement) {
      this.triggerElement.removeEventListener("click", this.clickEventHandler);
    }
  }

  clickEventHandler = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const modalProps = _.omit(this.props, ["target"]);
    const toggleModal = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    return (
      <Provider value={{ toggleModal }}>
        <Modal
          {...modalProps}
          isOpen={this.state.isOpen}
          toggle={toggleModal}
        />
      </Provider>
    );
  }
}

export { UncontrolledModal };

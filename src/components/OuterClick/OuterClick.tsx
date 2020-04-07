import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

// Safely gets the browser document object,
// returns a simple mock for server rendering purposes
const getDocument = () =>
  typeof document === "undefined"
    ? {
        querySelector() {
          return null;
        },
      }
    : document;

/*
    Calls an EventHandler when User clicks outside of the child element
*/
class OuterClick extends React.Component<{
  onClickOutside?: (event: MouseEvent) => void;
  children?: any;
  excludedElements?: any[];
  active?: boolean;
}> {
  static defaultProps = {
    onClickOutside: () => {},
    excludedElements: [],
    active: true,
  };

  rootElement: HTMLBodyElement;
  elementRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.rootElement = getDocument().querySelector("body");

    if (this.rootElement) {
      this.rootElement.addEventListener("click", this.handleDocumentClick);
      this.rootElement.addEventListener("touchstart", this.handleDocumentClick);
    }
  }

  componentWillUnmount() {
    if (this.rootElement) {
      this.rootElement.removeEventListener("click", this.handleDocumentClick);
      this.rootElement.removeEventListener(
        "touchstart",
        this.handleDocumentClick
      );
    }
  }

  handleDocumentClick = (evt) => {
    if (this.props.active) {
      const domElement = this.elementRef.current;

      const isExcluded = _.some(
        this.props.excludedElements,
        // eslint-disable-next-line react/no-find-dom-node
        (element) =>
          element && ReactDOM.findDOMNode(element).contains(evt.target)
      );

      if (!isExcluded && domElement && !domElement.contains(evt.target)) {
        this.props.onClickOutside(evt);
      }
    }
  };

  render() {
    return <section ref={this.elementRef}>{this.props.children}</section>;
  }
}

export { OuterClick };

import React from "react";
import classNames from "classnames";

import { Container } from "reactstrap";
import { FloatGridProvider } from "./context";
import "./../../styles/components/float-grid.scss";

export class Grid extends React.Component<{
  active?: boolean;
  children?: any;
  fluid?: boolean;
  rowHeight?: number;
  className?: string;
}> {
  static defaultProps = {
    active: true,
    fluid: false,
    rowHeight: 100,
  };

  state = {
    gridSize: { w: 0, h: 0 },
    gridReady: false,
  };
  gridRef = React.createRef<HTMLDivElement>();
  resizeDebounceTimeout = 0;

  componentDidMount() {
    this.setState({
      gridSize: {
        w: this.gridRef.current.clientWidth,
        h: this.gridRef.current.clientHeight,
      },
    });

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this._resizeHandler);
    }
  }

  componentDidUpdate(nextProps) {
    // HACK
    if (typeof window !== "undefined" && nextProps.fluid !== this.props.fluid) {
      window.dispatchEvent(new Event("resize"));
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this._resizeHandler);
    }
  }

  render() {
    const {
      active,
      children,
      fluid,
      className,
      rowHeight,
      ...otherProps
    } = this.props;
    const { gridSize } = this.state;
    const modifiedChildren = React.Children.map(children, (child) =>
      React.cloneElement(child, {
        ...otherProps,
        active,
        gridSize,
      })
    );

    const floatWrapClasses = classNames(
      {
        "float-grid-parent__static": !fluid,
      },
      className,
      "float-grid-parent"
    );

    return (
      <FloatGridProvider
        value={{
          gridUnitsToPx: (w, h) => {
            return {
              wPx: (w / 12) * gridSize.w,
              hPx: h * rowHeight,
            };
          },
          active,
          gridReady: this.state.gridReady,
          setGridReady: () => {
            this.setState({ gridReady: true });
          },
        }}
      >
        {active ? (
          <div className={floatWrapClasses} ref={this.gridRef}>
            {modifiedChildren}
          </div>
        ) : (
          <div ref={this.gridRef}>
            <Container fluid={fluid} className={className} {...otherProps}>
              {modifiedChildren}
            </Container>
          </div>
        )}
      </FloatGridProvider>
    );
  }

  _resizeHandler = () => {
    clearInterval(this.resizeDebounceTimeout);

    this.resizeDebounceTimeout = window.setTimeout(() => {
      this.setState({
        gridSize: {
          w: this.gridRef.current.clientWidth,
          h: this.gridRef.current.clientHeight,
        },
      });
    }, (1000 / 60) * 10); //Every 10 frames debounce
  };
}

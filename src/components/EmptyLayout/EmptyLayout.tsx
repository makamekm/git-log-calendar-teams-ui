import React from "react";
import classNames from "classnames";
import { withLayoutConfigComponent } from "../Layout/LayoutContext";

@withLayoutConfigComponent
export class EmptyLayout extends React.Component<{
  layoutConfig?: any;
  children: any;
  className?: string;
}> {
  componentDidMount() {
    this.props.layoutConfig.setElementsVisibility({
      navbarHidden: true,
      sidebarHidden: true,
      footerHidden: true,
    });
  }

  componentWillUnmount() {
    this.props.layoutConfig.setElementsVisibility({
      navbarHidden: false,
      sidebarHidden: false,
      footerHidden: false,
    });
  }

  render() {
    const emptyLayoutClass = classNames("fullscreen", this.props.className);

    return <div className={emptyLayoutClass}>{this.props.children}</div>;
  }
}

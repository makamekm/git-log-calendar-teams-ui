import React from "react";
import classNames from "classnames";
import {
  SidebarEntryAnimate,
  SlimSidebarAnimate,
  SlimMenuAnimate,
} from "@owczar/dashboard-style--airframe";
import {
  withLayoutConfigComponent,
  LayoutConfig,
} from "../Layout/LayoutContext";

@withLayoutConfigComponent
export class SidebarContent extends React.Component<{
  children?: any;
  slim?: boolean;
  collapsed?: boolean;
  animationsDisabled?: boolean;
  layoutConfig?: LayoutConfig;
}> {
  state = {
    entryAnimationFinished: false,
  };
  sidebarRef = React.createRef<HTMLDivElement>();

  sidebarEntryAnimate: any;
  slimSidebarAnimate: any;
  slimMenuAnimate: any;

  componentDidMount() {
    this.sidebarEntryAnimate = new SidebarEntryAnimate();
    this.slimSidebarAnimate = new SlimSidebarAnimate();
    this.slimMenuAnimate = new SlimMenuAnimate();

    this.sidebarEntryAnimate.assignParentElement(this.sidebarRef.current);
    this.slimSidebarAnimate.assignParentElement(this.sidebarRef.current);
    this.slimMenuAnimate.assignSidebarElement(this.sidebarRef.current);

    this.sidebarEntryAnimate.executeAnimation().then(() => {
      this.setState({ entryAnimationFinished: true });
    });
  }

  componentWillUnmount() {
    this.sidebarEntryAnimate.destroy();
    this.slimSidebarAnimate.destroy();
    this.slimMenuAnimate.destroy();
  }

  render() {
    const {
      animationsDisabled,
      collapsed,
      layoutConfig,
      slim,
      children,
    } = this.props;

    const sidebarClass = classNames("sidebar", "sidebar--animations-enabled", {
      "sidebar--slim": slim || layoutConfig.sidebarSlim,
      "sidebar--collapsed": collapsed || layoutConfig.sidebarCollapsed,
      "sidebar--animations-disabled":
        animationsDisabled || layoutConfig.animationsDisabled,
      "sidebar--animate-entry-complete": this.state.entryAnimationFinished,
    });

    return (
      <div className={sidebarClass} ref={this.sidebarRef}>
        {children}
      </div>
    );
  }
}

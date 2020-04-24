import React from "react";
import classNames from "classnames";
import {
  withLayoutConfigComponent,
  LayoutConfig,
} from "../Layout/LayoutContext";
import { SidebarEntryAnimate } from "./sidebar-entry-animate";
import { SlimSidebarAnimate } from "./slim-sidebar-animate";

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

  componentDidMount() {
    this.sidebarEntryAnimate = new SidebarEntryAnimate();
    this.slimSidebarAnimate = new SlimSidebarAnimate();

    this.sidebarEntryAnimate.assignParentElement(this.sidebarRef.current);
    this.slimSidebarAnimate.assignParentElement(this.sidebarRef.current);

    this.sidebarEntryAnimate.executeAnimation().then(() => {
      this.setState({ entryAnimationFinished: true });
    });
  }

  componentWillUnmount() {
    this.sidebarEntryAnimate.destroy();
    this.slimSidebarAnimate.destroy();
  }

  render() {
    const {
      animationsDisabled,
      collapsed,
      layoutConfig,
      slim,
      children,
    } = this.props;

    const sidebarClass = classNames(
      "sidebar",
      "no-print",
      "sidebar--animations-enabled",
      {
        "sidebar--slim": slim || layoutConfig.sidebarSlim,
        "sidebar--collapsed": collapsed || layoutConfig.sidebarCollapsed,
        "sidebar--animations-disabled":
          animationsDisabled || layoutConfig.animationsDisabled,
        "sidebar--animate-entry-complete": this.state.entryAnimationFinished,
      }
    );

    return (
      <div className={sidebarClass} ref={this.sidebarRef}>
        {children}
      </div>
    );
  }
}

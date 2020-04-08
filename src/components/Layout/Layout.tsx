import React from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { withRouter, RouteComponentProps } from "react-router-dom";
import _ from "lodash";

import { LayoutContent } from "./LayoutContent";
import { LayoutNavbar } from "./LayoutNavbar";
import { LayoutSidebar } from "./LayoutSidebar";
import { LayoutProvider, LayoutState } from "./LayoutContext";

export interface LayoutChild {
  type: {
    layoutPartName: string;
  };
}

const findChildByType = (
  children: LayoutChild | LayoutChild[],
  targetType: any
) => {
  let result;

  React.Children.forEach(children, (child) => {
    if (child.type.layoutPartName === targetType.layoutPartName) {
      result = child;
    }
  });

  return result;
};

const findChildrenByType = (children: any, targetType: any) => {
  return _.filter(
    React.Children.toArray(children),
    (child: any) => child.type.layoutPartName === targetType.layoutPartName
  );
};

const responsiveBreakpoints = {
  xs: { max: 575.8 },
  sm: { min: 576, max: 767.8 },
  md: { min: 768, max: 991.8 },
  lg: { min: 992, max: 1199.8 },
  xl: { min: 1200 },
};

export interface LayoutProps {
  children: any;
  sidebarSlim: boolean;
  location: any;
}

class Layout extends React.Component<RouteComponentProps & LayoutProps> {
  state: LayoutState = {
    sidebarHidden: false,
    navbarHidden: false,
    footerHidden: false,
    sidebarCollapsed: true,
    screenSize: "",
    animationsDisabled: true,

    pageTitle: null,
    pageDescription: "Default Dashboard ready for Development",
    pageKeywords: "react dashboard seed bootstrap",
  };
  lastLgSidebarCollapsed = true;
  containerRef = React.createRef<HTMLDivElement>();
  bodyElement: HTMLElement;
  documentElement: HTMLElement;

  componentDidMount() {
    // Determine the current window size
    // and set it up in the context state
    const layoutAdjuster = () => {
      const { screenSize } = this.state;
      let currentScreenSize;

      _.forOwn(
        responsiveBreakpoints,
        (
          value: {
            min?: number;
            max?: number;
          },
          key
        ) => {
          const queryParts = [
            `${_.isUndefined(value.min) ? "" : `(min-width: ${value.min}px)`}`,
            `${_.isUndefined(value.max) ? "" : `(max-width: ${value.max}px)`}`,
          ];
          const query = _.compact(queryParts).join(" and ");

          if (window.matchMedia(query).matches) {
            currentScreenSize = key;
          }
        }
      );

      if (screenSize !== currentScreenSize) {
        this.setState({ screenSize: currentScreenSize });
        this.updateLayoutOnScreenSize(currentScreenSize);
      }
    };

    // Add window initialization
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        setTimeout(layoutAdjuster.bind(this), 0);
      });

      layoutAdjuster();

      window.requestAnimationFrame(() => {
        this.setState({ animationsDisabled: false });
      });
    }
    // Add document initialization
    if (typeof document !== "undefined") {
      this.bodyElement = document.body;
      this.documentElement = document.documentElement;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Prevent content scrolling in overlay mode
    if (
      this.bodyElement &&
      this.documentElement &&
      (this.state.screenSize === "xs" ||
        this.state.screenSize === "sm" ||
        this.state.screenSize === "md")
    ) {
      if (prevState.sidebarCollapsed !== this.state.sidebarCollapsed) {
        // Most of the devices
        const styleUpdate = this.state.sidebarCollapsed
          ? {
              overflowY: "auto",
              touchAction: "auto",
            }
          : {
              overflowY: "hidden",
              touchAction: "none",
            };
        Object.assign(this.bodyElement.style, styleUpdate);
        Object.assign(this.documentElement.style, styleUpdate);
      }
    }

    // After location change
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // Scroll to top
      if (this.bodyElement && this.documentElement) {
        this.documentElement.scrollTop = this.bodyElement.scrollTop = 0;
      }

      // Hide the sidebar when in overlay mode
      if (
        !this.state.sidebarCollapsed &&
        (this.state.screenSize === "xs" ||
          this.state.screenSize === "sm" ||
          this.state.screenSize === "md")
      ) {
        // Add some time to prevent jank while the dom is updating
        setTimeout(() => {
          this.setState({ sidebarCollapsed: true });
        }, 100);
      }
    }

    // Update positions of STICKY navbars
    this.updateNavbarsPositions();
  }

  updateLayoutOnScreenSize(screenSize: string) {
    if (screenSize === "md" || screenSize === "sm" || screenSize === "xs") {
      // Save for recovering to lg later
      this.lastLgSidebarCollapsed = this.state.sidebarCollapsed;
      this.setState({ sidebarCollapsed: true });
    } else {
      this.setState({ sidebarCollapsed: this.lastLgSidebarCollapsed });
    }
  }

  updateNavbarsPositions() {
    if (this.containerRef.current) {
      const navbarElements = this.containerRef.current.querySelectorAll<
        HTMLElement
      >(":scope .layout__navbar");

      // Calculate and update style.top of each navbar
      let totalNavbarsHeight = 0;
      navbarElements.forEach((navbarElement) => {
        const navbarBox = navbarElement.getBoundingClientRect();
        navbarElement.style.top = `${totalNavbarsHeight}px`;
        totalNavbarsHeight += navbarBox.height;
      });
    }
  }

  toggleSidebar() {
    this.setState({
      sidebarCollapsed: !this.state.sidebarCollapsed,
    });
  }

  setElementsVisibility(elements: string[]) {
    this.setState(
      _.pick(elements, ["sidebarHidden", "navbarHidden", "footerHidden"])
    );
  }

  render() {
    const { children } = this.props;
    const sidebar = findChildByType(children, LayoutSidebar);
    const navbars = findChildrenByType(children, LayoutNavbar);
    const content = findChildByType(children, LayoutContent);
    const otherChildren = _.differenceBy(
      React.Children.toArray(children),
      [sidebar, ...navbars, content],
      "type"
    );
    const layoutClass = classNames("layout", "layout--animations-enabled", {
      //'layout--only-navbar': this.state.sidebarHidden && !this.state.navbarHidden
    });

    return (
      <LayoutProvider
        value={{
          ...this.state,
          sidebarSlim:
            !!this.props.sidebarSlim &&
            (this.state.screenSize === "lg" || this.state.screenSize === "xl"),

          toggleSidebar: this.toggleSidebar.bind(this),
          setElementsVisibility: this.setElementsVisibility.bind(this),
          changeMeta: (metaData) => {
            this.setState(metaData);
          },
        }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {"Dashboard" +
              (this.state.pageTitle ? ` - ${this.state.pageTitle}` : "")}
          </title>
          <link rel="canonical" href={"/"} />
          <meta name="description" content={this.state.pageDescription} />
        </Helmet>
        <div
          className={classNames(layoutClass, "layout--theme--light--primary")}
          ref={this.containerRef}
        >
          {!this.state.sidebarHidden &&
            sidebar &&
            React.cloneElement(sidebar, {
              sidebarSlim:
                !!this.props.sidebarSlim &&
                this.state.sidebarCollapsed &&
                (this.state.screenSize === "lg" ||
                  this.state.screenSize === "xl"),
              sidebarCollapsed:
                !this.props.sidebarSlim && this.state.sidebarCollapsed,
            })}

          <div className="layout__wrap">
            {!this.state.navbarHidden && navbars}

            {content}
          </div>

          {otherChildren}
        </div>
        )}
      </LayoutProvider>
    );
  }
}

const routedLayout = withRouter(Layout);

export { routedLayout as Layout };

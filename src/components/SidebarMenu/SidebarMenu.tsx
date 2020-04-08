import React from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";
import { SideMenuAnimate } from "./side-menu-animate";

import { MenuContext } from "./context";
import { SideBarMenuEntry } from "./SideBarMenuEntry";
import {
  withLayoutConfigComponent,
  LayoutConfig,
} from "../Layout/LayoutContext";

@withLayoutConfigComponent
@(withRouter as any)
export class SidebarMenu extends React.Component<
  {
    children?: any;
    currentUrl?: string;
    slim?: boolean;
    location?: any;
    disabled?: boolean;
    layoutConfig?: LayoutConfig;
  },
  {
    entries: {
      [id: string]: SideBarMenuEntry;
    };
  }
> {
  containerRef = React.createRef<HTMLUListElement>();
  entries: {
    [id: string]: SideBarMenuEntry;
  } = {};
  state = {
    entries: this.entries,
  };
  sidebarAnimation: any;

  addEntry(entry) {
    this.setState({
      entries: this.entries = {
        ...this.entries,
        [entry.id]: {
          open: false,
          active: false,
          ...entry,
        },
      },
    });
  }

  updateEntry(id, stateMods) {
    this.setState({
      entries: this.entries = {
        ...this.state.entries,
        [id]: {
          ...this.state.entries[id],
          ...stateMods,
        },
      },
    });
  }

  removeEntry(id) {
    // eslint-disable-next-line no-unused-vars
    const { [id]: toRemove, ...rest } = this.state.entries;
    this.setState({ entries: this.entries = rest });
  }

  setActiveEntries(openActive = false) {
    const activeId = (childEntry, entries, previous = []) => {
      if (childEntry.parentId) {
        const parentEntry = entries[childEntry.parentId];
        const activeIds = [...previous, parentEntry.id];
        return activeId(parentEntry, entries, activeIds);
      }
      return previous;
    };

    const activeChild = _.find(this.state.entries, (entry) => {
      const { pathname } = this.props.location;

      const noTailSlashLocation =
        pathname[pathname.length - 1] === "/" && pathname.length > 1
          ? pathname.replace(/\/$/, "")
          : pathname;

      return entry.exact
        ? entry.url === noTailSlashLocation
        : _.includes(noTailSlashLocation, entry.url);
    });

    if (activeChild) {
      const activeEntries = [
        ...activeId(activeChild, this.entries),
        activeChild.id,
      ];

      this.setState({
        entries: this.entries = _.mapValues(this.entries, (entry) => {
          const isActive = _.includes(activeEntries, entry.id);

          return {
            ...entry,
            active: isActive,
            open: openActive ? !entry.url && isActive : entry.open,
          };
        }),
      });
    }
  }

  componentDidMount() {
    this.sidebarAnimation = new SideMenuAnimate();
    this.sidebarAnimation.assignParentElement(this.containerRef.current);

    setTimeout(() => {
      this.setActiveEntries(true);
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setActiveEntries();
    }
  }

  componentWillUnmount() {
    if (this.sidebarAnimation) {
      this.sidebarAnimation.destroy();
    }
  }

  render() {
    const isSlim =
      this.props.slim ||
      (this.props.layoutConfig.sidebarSlim &&
        this.props.layoutConfig.sidebarCollapsed &&
        (this.props.layoutConfig.screenSize === "lg" ||
          this.props.layoutConfig.screenSize === "xl"));
    const sidebarMenuClass = classNames("sidebar-menu", {
      "sidebar-menu--slim": isSlim,
      "sidebar-menu--disabled": this.props.disabled,
    });

    return (
      <MenuContext.Provider
        value={{
          entries: this.state.entries,
          addEntry: this.addEntry.bind(this),
          updateEntry: this.updateEntry.bind(this),
          removeEntry: this.removeEntry.bind(this),
        }}
      >
        <ul className={sidebarMenuClass} ref={this.containerRef}>
          {React.Children.map(this.props.children, (child) => (
            <MenuContext.Consumer>
              {(ctx) =>
                React.cloneElement(child, {
                  ...ctx,
                  currentUrl: this.props.location.pathname,
                  slim: isSlim,
                })
              }
            </MenuContext.Consumer>
          ))}
        </ul>
      </MenuContext.Provider>
    );
  }
}

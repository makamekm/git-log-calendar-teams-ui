import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

import { MenuContext } from "./context";
import { SideBarMenuEntry } from "./SidebarMenuEntry";

/**
 * Renders a collapse trigger or a ReactRouter Link
 */
const SidebarMenuItemLink = (props: {
  to?: string;
  href?: string;
  active?: boolean;
  onToggle?: () => void;
  children?: any;
  classBase?: string;
}) =>
  props.to || props.href ? (
    props.to ? (
      <Link to={props.to} className={`${props.classBase}__entry__link`}>
        {props.children}
      </Link>
    ) : (
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${props.classBase}__entry__link`}
      >
        {props.children}
      </a>
    )
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      // eslint-disable-next-line no-script-url
      href="javascript:;"
      className={`${props.classBase}__entry__link`}
      onClick={() => props.onToggle()}
    >
      {props.children}
    </a>
  );

/**
 * The main menu entry component
 */
export class SidebarMenuItem extends React.Component<{
  addEntry?: (entry: SideBarMenuEntry) => void;
  updateEntry?: (id: string, entry: SideBarMenuEntry) => void;
  removeEntry?: (id: string) => void;
  entries?: object;
  parentId?: string;
  children?: any;
  isSubNode?: boolean;
  currentUrl?: string;
  slim?: boolean;
  icon?: any;
  title?: any;
  to?: string;
  href?: string;
  exact?: boolean;
  noCaret?: boolean;
}> {
  static defaultProps = {
    exact: true,
  };

  id: string = uuid();

  componentDidMount() {
    const entry: SideBarMenuEntry = {
      id: this.id,
      parentId: this.props.parentId,
      exact: !!this.props.exact,
    };

    if (this.props.to) {
      entry.url = this.props.to;
    }

    this.props.addEntry(entry);
  }

  componentWillUnmount() {
    this.props.removeEntry(this.id);
  }

  getEntry() {
    return this.props.entries[this.id];
  }

  toggleNode() {
    const entry = this.getEntry();

    this.props.updateEntry(this.id, { open: !entry.open });
  }

  render() {
    const entry = this.getEntry();
    const classBase = this.props.isSubNode ? "sidebar-submenu" : "sidebar-menu";
    const itemClass = classNames(`${classBase}__entry`, {
      [`${classBase}__entry--nested`]: !!this.props.children,
      open: entry && entry.open,
      active: entry && entry.active,
    });

    return (
      <li
        className={classNames(itemClass, {
          "sidebar-menu__entry--no-caret": this.props.noCaret,
        })}
      >
        <SidebarMenuItemLink
          to={this.props.to || null}
          href={this.props.href || null}
          onToggle={this.toggleNode.bind(this)}
          classBase={classBase}
        >
          {this.props.icon &&
            React.cloneElement(this.props.icon, {
              className: classNames(
                this.props.icon.props.className,
                `${classBase}__entry__icon`
              ),
            })}
          {typeof this.props.title === "string" ? (
            <span>{this.props.title}</span>
          ) : (
            this.props.title
          )}
        </SidebarMenuItemLink>
        {this.props.children && (
          <ul className="sidebar-submenu">
            {React.Children.map(this.props.children, (child) => (
              <MenuContext.Consumer>
                {(ctx) =>
                  React.cloneElement(child, {
                    isSubNode: true,
                    parentId: this.id,
                    currentUrl: this.props.currentUrl,
                    slim: this.props.slim,
                    ...ctx,
                  })
                }
              </MenuContext.Consumer>
            ))}
          </ul>
        )}
      </li>
    );
  }
}

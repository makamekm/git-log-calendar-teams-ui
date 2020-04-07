/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

import { Consumer } from "./context";

class NestedDropdownSubmenu extends React.Component<{
  children?: any;
  title?: any;
  tag?: any;
  subMenuTag?: any;
  className?: string;
  // Context Provided?
  openId?: string;
  onOpen?: (id: string) => void;
}> {
  id = uuid();

  static defaultProps = {
    tag: "div",
    subMenuTag: "div",
  };

  render() {
    const {
      tag: Tag,
      subMenuTag: SubMenuTag,
      title,
      children,
      className,
      openId,
      onOpen,
    } = this.props;
    const itemClass = classNames(className, "nested-dropdown__submenu-item", {
      "nested-dropdown__submenu-item--open": openId === this.id,
    });
    const linkClass = classNames(
      "nested-dropdown__submenu-item__link",
      "dropdown-item"
    );

    return (
      <Tag className={itemClass}>
        <a
          // eslint-disable-next-line no-script-url
          href="javascript:;"
          className={linkClass}
          onClick={() => {
            onOpen(this.id);
          }}
        >
          {title}
        </a>
        <div className="nested-dropdown__submenu-item__menu-wrap">
          <SubMenuTag className="nested-dropdown__submenu-item__menu dropdown-menu">
            {children}
          </SubMenuTag>
        </div>
      </Tag>
    );
  }
}

const ContextNestedDropdownSubmenu = (props) => (
  <Consumer>
    {(contextProps) => <NestedDropdownSubmenu {...contextProps} {...props} />}
  </Consumer>
);

export { ContextNestedDropdownSubmenu as NestedDropdownSubmenu };

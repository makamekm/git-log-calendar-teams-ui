import React from "react";
import classNames from "classnames";

const ExtendedDropdownSection = (
  props: {
    children?: any;
    list?: boolean;
    className?: string;
    tag?: any;
  } & any
) => {
  const { children, list, className, tag, ...otherProps } = props;
  const sectionClass = classNames("extended-dropdown__section", className, {
    "extended-dropdown__section--list": list,
  });
  const Tag = tag;

  return (
    <Tag className={sectionClass} {...otherProps}>
      {children}
    </Tag>
  );
};

ExtendedDropdownSection.defaultProps = {
  tag: "div",
};

export { ExtendedDropdownSection };

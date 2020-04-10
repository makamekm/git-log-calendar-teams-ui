import React from "react";
import classNames from "classnames";

import { Avatar } from "./Avatar";

import colors from "~/styles/colors.scss";

console.log(colors);

const AvatarFont = (props: {
  children?: any;
  bgColor?: string;
  fgColor?: string;
  bgColorCustom?: string;
  fgColorCustom?: string;
  size?: string;
  addOns?: any;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const {
    children,
    bgColor,
    fgColor,
    bgColorCustom,
    fgColorCustom,
    ...avatarProps
  } = props;
  const parentClass = classNames(
    "avatar-font",
    `avatar-font--${avatarProps.size}`,
    bgColor && colors[`bg-color--${bgColor}`]
  );
  const childClass = classNames(
    "avatar-font__text",
    fgColor && colors[`fg-color--${fgColor}`]
  );
  console.log(bgColor, "|", parentClass, "|", fgColor, "|", childClass);
  const parentCustomStyle = bgColorCustom
    ? {
        backgroundColor: bgColorCustom,
      }
    : {};
  const childCustomStyle = fgColorCustom
    ? {
        color: fgColorCustom,
      }
    : {};
  const child = <span>{children}</span>;

  return (
    <Avatar {...avatarProps}>
      <div className={parentClass} style={parentCustomStyle}>
        {React.cloneElement(child, {
          style: childCustomStyle,
          className: classNames(child.props.className, childClass),
        })}
      </div>
    </Avatar>
  );
};

AvatarFont.defaultProps = {
  bgColor: "400",
  fgColor: "white",
  size: "md",
};

export { AvatarFont };

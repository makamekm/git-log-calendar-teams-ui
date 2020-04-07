import React from "react";
import classNames from "classnames";

import avatarColors from "./../../colors.scss";

const AvatarAddonIcon = (props: {
  small?: boolean;
  className?: string;
  color?: string;
}) => {
  const addOnClass = classNames(
    {
      avatar__icon__inner: props.small,
    },
    avatarColors[`fg-color--${props.color}`]
  );

  return <i className={classNames(addOnClass, props.className)}></i>;
};

AvatarAddonIcon.defaultProps = {
  color: "success",
};
AvatarAddonIcon.addOnId = "avatar--icon";

export { AvatarAddonIcon };

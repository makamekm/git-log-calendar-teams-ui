import React from "react";
import { Badge, BadgeProps } from "reactstrap";

const AvatarAddonBadge = (
  props: { children?: any; className?: string } & BadgeProps
) => {
  const { children, ...badgeProps } = props;

  return <Badge {...badgeProps}>{children}</Badge>;
};

AvatarAddonBadge.addOnId = "avatar--badge";

export { AvatarAddonBadge };

import React from "react";
import { Badge } from "reactstrap";

const AvatarAddonBadge = (props: { children?: any; className?: string }) => {
  const { children, ...badgeProps } = props;

  return <Badge {...badgeProps}>{children}</Badge>;
};

AvatarAddonBadge.addOnId = "avatar--badge";

export { AvatarAddonBadge };

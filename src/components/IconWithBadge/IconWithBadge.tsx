import React from "react";
import classNames from "classnames";

const IconWithBadge = (props: {
  badge?: any;
  children?: any;
  className?: string;
}) => {
  const { badge, children, className } = props;
  const adjustedBadge = React.cloneElement(badge, {
    className: classNames(badge.props.className, "icon-with-badge__badge"),
  });
  const wrapClass = classNames(className, "icon-with-badge");
  return (
    <div className={wrapClass}>
      {children}
      {adjustedBadge}
    </div>
  );
};

export { IconWithBadge };

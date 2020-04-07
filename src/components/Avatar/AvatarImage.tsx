import React from "react";
import classNames from "classnames";

import { Avatar } from "./Avatar";
import { AvatarFont } from "./AvatarFont";

class AvatarImage extends React.PureComponent<{
  src: string;
  placeholder?: any;
  alt?: string;
  size?: string;
  addOns?: any;
  style?: any;
  className?: string;
}> {
  static defaultProps = {
    placeholder: <i className="fa fa-user fa-fw"></i>,
  };

  state = {
    imgLoaded: false,
  };

  render() {
    const { src, placeholder, alt, className, ...avatarProps } = this.props;
    const parentClass = classNames(
      "avatar-image",
      {
        "avatar-image--loaded": this.state.imgLoaded,
      },
      className
    );

    return (
      <div className={parentClass}>
        <Avatar className="avatar-image__image" {...avatarProps}>
          <img
            src={src}
            alt={alt}
            onLoad={() => {
              this.setState({ imgLoaded: true });
            }}
          />
        </Avatar>
        {!this.state.imgLoaded && (
          <AvatarFont className="avatar-image__placeholder" {...avatarProps}>
            {placeholder}
          </AvatarFont>
        )}
      </div>
    );
  }
}

export { AvatarImage };

import React from "react";
import _ from "lodash";
import { v4 as uid } from "uuid";
import qs from "query-string";

import colors from "../../colors";

export interface HolderTextProviderProps {
  bg?: string;
  fg?: string;
  text?: string;
  width?: number | string;
  height?: number | string;
  font?: string;
  align?: string;
  outline?: boolean;
  lineWrap?: number;
  children?: any;
  size?: number;
}

class HolderTextProvider extends React.Component<HolderTextProviderProps> {
  static defaultProps = {
    width: "100p",
    height: 220,
    bg: colors["200"],
    fg: colors["500"],
  };

  domId = `holderjs--${uid()}`;

  componentDidMount() {
    this.initPlaceholder();

    if (typeof window !== "undefined") {
      window.onload = this.initPlaceholder.bind(this);
    }
  }

  componentDidUpdate() {
    this.initPlaceholder();
  }

  initPlaceholder() {
    if (
      typeof window !== "undefined" &&
      typeof document !== "undefined" &&
      document.readyState === "complete"
    ) {
      const Holder = require("holderjs");
      const domElement = document.getElementById(this.domId);

      if (domElement) {
        Holder.run({
          domain: "holder.js",
          images: domElement,
          object: null,
          bgnodes: null,
          stylenodes: null,
        });

        return true;
      }
    }

    return false;
  }

  render() {
    const onlyChild = React.Children.only(this.props.children);

    const phProps = _.omit(this.props, ["children", "width", "height"]);
    const phPropsQuery = qs.stringify(phProps);

    return React.cloneElement(onlyChild, {
      id: this.domId,
      "data-src": `holder.js/${this.props.width}x${this.props.height}?${phPropsQuery}`,
    });
  }
}

export { HolderTextProvider };

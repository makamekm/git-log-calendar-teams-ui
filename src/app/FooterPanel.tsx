import React from "react";
import classNames from "classnames";
import { FooterText } from "./FooterText";

const FooterPanel = ({ className }: { className?: string }) => (
  <p className={classNames(className, "small")}>
    <FooterText />
  </p>
);

export { FooterPanel };

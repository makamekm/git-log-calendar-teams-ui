import React from "react";
import { Link } from "react-router-dom";

import { LogoThemed } from "../../app/LogoThemed";

const HeaderPanel = (props: { icon?: string; title?: any; text?: any }) => (
  <div className="mb-4">
    <div className="mb-5 text-center">
      <Link to="/" className="d-inline-block">
        {props.icon ? (
          <i className={`fa fa-${props.icon} fa-3x`}></i>
        ) : (
          <LogoThemed />
        )}
      </Link>
    </div>
    <h5 className="text-center mb-4 text-5xl">{props.title}</h5>
    <div className="text-center text-2xl">{props.text}</div>
  </div>
);

HeaderPanel.defaultProps = {
  title: "",
};

export { HeaderPanel };

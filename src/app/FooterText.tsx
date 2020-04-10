import React from "react";

const FooterText = (props: { year?: any; name?: any; desc?: any }) => (
  <React.Fragment>
    (C) {props.year} All Rights Reserved. This is the &quot;{props.name}&quot;
    built with {props.desc}. Designed and implemented by{" "}
    <a
      href="https://github.com/makamekm"
      target="_blank"
      rel="noopener noreferrer"
      className="sidebar__link"
    >
      github.com/makamekm
    </a>
  </React.Fragment>
);

FooterText.defaultProps = {
  year: "2018",
  name: "Admin Theme",
  desc: "Bootstrap 4, React 16 (latest) & NPM",
};

export { FooterText };

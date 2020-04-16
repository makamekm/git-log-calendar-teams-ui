import React from "react";
// import { ipc } from "~/shared/ipc";

const FooterText = () => {
  // const [state, setState] = React.useState({
  //   appName: "345",
  //   appVersion: "5435",
  // });

  // const askAppInfo = async () => {
  //   const { appName, appVersion } = await ipc.handlers.APP_INFO();
  //   setState({ appName, appVersion });
  // };

  // React.useEffect(() => {
  //   askAppInfo();
  // }, []);

  return (
    <React.Fragment>
      Designed and implemented by{" "}
      <a
        href="https://github.com/makamekm"
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar__link"
      >
        github.com/makamekm
      </a>
      {/* <p>
        {state.appName} {state.appVersion}
      </p> */}
    </React.Fragment>
  );
};

export { FooterText };

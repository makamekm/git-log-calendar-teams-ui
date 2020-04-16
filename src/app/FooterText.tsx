import React from "react";
import { ipc } from "~/shared/ipc";

const FooterText = () => {
  const [state, setState] = React.useState({
    appName: "-",
    appVersion: "-",
  });

  const askAppInfo = async () => {
    const { appName, appVersion } = await ipc.handlers.APP_INFO();
    setState({ appName, appVersion });
  };

  React.useEffect(() => {
    askAppInfo();
  }, []);

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
      <div>
        {state.appName} {state.appVersion}
      </div>
    </React.Fragment>
  );
};

export { FooterText };

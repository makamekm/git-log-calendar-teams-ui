import React from "react";
import logo from "./logo.svg";
import "./app.css";
import { ipc } from "./shared/ipc";
import { Excel } from "./excel";

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-grids/styles/material.css';
import '@syncfusion/ej2-react-spreadsheet/styles/material.css';

export const App = () => {
  // const [state, setState] = React.useState({
  //   appName: "",
  //   appVersion: ""
  // });

  // const askAppInfo = async () => {
  //   const { appName, appVersion } = await ipc.handlers.APP_INFO();
  //   setState({ appName, appVersion });
  // };

  // React.useEffect(() => {
  //   askAppInfo();
  // }, []);

  return (
    <div className="main">
      <Excel />
    </div>
  );
};

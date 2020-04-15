import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import "./styles/main.scss";
import "./index.css";
import { App } from "./app";
import * as serviceWorker from "./serviceWorker";

// Decorate MOBX Observer
const base = React.createElement;

(React as any).createElement = (type, props, ...children) => {
  const t: any = typeof type;
  if (
    t === "function" &&
    type.prototype === undefined &&
    type.name &&
    !type.name.includes("Layout")
  ) {
    type = observer(type);
  }
  return base(type, props, ...children);
};

// Render App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

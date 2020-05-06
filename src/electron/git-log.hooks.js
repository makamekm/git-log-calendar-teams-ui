const log = require("electron-log");

const ignoreLines = [
  "password",
  "DeprecationWarning",
  "deprecated",
  "Electron Security Warning (Insecure Content-Security-Policy)",
  "Warning: Using UNSAFE_componentWillMount",
  "Warning: validateDOMNesting(...)",
  "Warning: A future version of React will block javascript",
  "Warning: Using UNSAFE_componentWillReceiveProps in strict mode is not recommended",
  "Warning: Legacy context API has been detected within a strict-mode tree",
  "Download the React DevTools for a better development experience",
  "[HMR] Waiting for update signal from WDS...",
  "[MobX] You haven't configured observer batching which might result in unexpected behavior in some cases",
  "Warning: Hash history cannot PUSH the same path",
];

const hasIgnores = (line) => {
  return (
    line &&
    line.includes &&
    ignoreLines.toLowerCase &&
    ignoreLines.toLowerCase().find((s) => line.includes(s))
  );
};

log.hooks.push((message, transport) => {
  if (
    message &&
    message.data &&
    message.data[0] &&
    hasIgnores(message.data[0])
  ) {
    return false;
  }

  return message;
});

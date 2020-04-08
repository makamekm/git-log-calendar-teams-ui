const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addWebpackAlias({
    "@lib": path.resolve(__dirname, "src/components"),
    "@app": path.resolve(__dirname, "src/routes/components"),
    "~": path.resolve(__dirname, "src/"),
  })
);

const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";

module.exports = override(
  addWebpackAlias({
    "@env": path.resolve(__dirname, "src/env", mode),
    "~": path.resolve(__dirname, "src/"),
  })
);

const path = require("path");
const { override, addWebpackAlias, getBabelLoader } = require("customize-cra");

const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";

const prependBabelPlugin = (plugin) => (config) => {
  getBabelLoader(config).options.plugins.unshift(plugin);
  return config;
};

module.exports = override(
  prependBabelPlugin("styled-jsx/babel"),
  addWebpackAlias({
    "@env": path.resolve(__dirname, "src/env", mode),
    "~": path.resolve(__dirname, "src/"),
  })
);

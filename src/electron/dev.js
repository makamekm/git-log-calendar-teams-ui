require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
  },
});

const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";

require("tsconfig-paths").register({
  baseUrl: "./",
  paths: {
    "@env/*": [`./src/env/${mode}/*`],
    "~/*": ["./src/*"],
  },
});

require("./index.js");

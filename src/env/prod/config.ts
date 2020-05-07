export const SHOW_WIP_MENU = false;
export const RUN_COLLECT_INTERVAL = true;
export const OPEN_MAIN_WINDOW_ON_LOAD = false;
export const OPEN_MAIN_WINDOW_DEV_TOOLS = false;
export const USE_AUTO_UPDATER = true;
export const CATCH_LOGS = true;
export const CONSOLE_LOG_LEVEL = "error";
export const FILE_LOG_LEVEL = "error";
export const DEV_CONFIG = "git-log-config.yml";
export const SERVER_SETTINGS = "./server-config.yml";
export const SWARM_INIT_TIMEOUT = 1000;
export const DRIVE_INIT_TIMEOUT = 1000;
export const DRIVE_BASE_FOLDER = "";
export const CACHE_LIFETIME = 10000;
export const BOOTSTRAP_SERVERS = [
  "bootstrap1.hyperdht.org:49737",
  "bootstrap2.hyperdht.org:49737",
  "bootstrap3.hyperdht.org:49737",
];

// https://github.com/hyperswarm/dht
/*
  To run own bootstrap servers: 
  npm install -g @hyperswarm/cli
  hyperswarm-dht # runs a DHT node

  Note: The default bootstrap servers are publicly served on behalf of the commons.
  To run a fully private DHT, start two or more dht nodes with an empty bootstrap array
  (dht({bootstrap:[]})) and then use the addresses of those nodes
  as the bootstrap option in all other dht nodes.
  
  For private secure networks you need to set the BOOTSTRAP_SERVERS to an empty array
*/

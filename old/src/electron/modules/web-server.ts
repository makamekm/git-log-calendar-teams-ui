import { server as webSocketServer } from "websocket";
import http from "http";
import { Server as StaticServer } from "node-static";
import { ipc, nameofHandler } from "~/shared/ipc";
import httpProxy from "http-proxy";

let server: http.Server;

ipcBus.on("ready", () => {
  start();
});

ipcBus.on("ON_SETTINGS_UPDATE_FINISH", () => {
  start();
});

const start = async () => {
  if (server) {
    server.close();
    server = null;
  }

  try {
    const settings = await ipc.handlers.GET_SETTINGS();
    if (settings.useWebServer) {
      let port = Number(settings.webPort);
      port = port === 1 ? 8080 : port || 8080;
      runWebServer(
        settings.webHostname || "0.0.0.0",
        port,
        settings.webStaticPath,
        !!settings.webIgnoreCors,
        settings.webProxy
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const runWebServer = (
  hostname: string,
  port: number,
  staticPath: string,
  ignoreCors?: boolean,
  proxyAddress?: string
) => {
  const clients = [];

  const file = new StaticServer(staticPath);
  const proxy = httpProxy.createProxyServer();

  server = http.createServer((req, res) => {
    if (proxyAddress) {
      proxy.web(req, res, { target: proxyAddress });
    } else {
      file.serve(req, res);
    }
  });

  server.listen(port, hostname, () => {
    console.log("Server is listening on port", port);
  });

  const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: !ignoreCors,
  });

  const unauthorizedChannels = [
    nameofHandler("APP_INFO"),
    nameofHandler("IS_COLLECTING_STATS"),
  ];

  wsServer.on("request", (request) => {
    console.log("connection from origin", request.origin);

    const connection = request.accept(null, request.origin);
    clients.push(connection);

    let isAuth = false;
    const subscriptions = {};

    connection.on("message", async (message) => {
      if (message.type === "utf8") {
        const data = JSON.parse(message.utf8Data);
        if (data.type === "invoke" && data.channel === "AUTH") {
          const config = await ipc.handlers.GET_CONFIG();
          if (!config.password || data.args[0] === config.password) {
            isAuth = true;
            connection.sendUTF(
              JSON.stringify({
                type: "invoke",
                id: data.id,
                result: true,
              })
            );
          } else {
            connection.sendUTF(
              JSON.stringify({
                type: "invoke",
                id: data.id,
                result: false,
              })
            );
          }
        } else if (data.type === "invoke") {
          if (!isAuth && !unauthorizedChannels.includes(data.channel)) {
            connection.sendUTF(
              JSON.stringify({
                type: "invoke_error",
                id: data.id,
                result: "You are not authorized to invoke " + data.channel,
              })
            );
          } else {
            try {
              const result = await ipcBus.invoke(data.channel, ...data.args);
              connection.sendUTF(
                JSON.stringify({ type: "invoke", id: data.id, result })
              );
            } catch (err) {
              console.error(err);
              connection.sendUTF(
                JSON.stringify({
                  type: "invoke_error",
                  id: data.id,
                  result: err.message,
                })
              );
            }
          }
        } else if (data.type === "subscribe" && !subscriptions[data.channel]) {
          const channel = data.channel;
          const onMessage = (...args) => {
            if (isAuth) {
              connection.sendUTF(
                JSON.stringify({ type: "on", channel, result: args })
              );
            }
          };
          subscriptions[channel] = ipcBus.subscribe(channel, onMessage);
        } else if (data.type === "unsubscribe" && subscriptions[data.channel]) {
          subscriptions[data.channel]();
          delete subscriptions[data.channel];
        }
      }
    });

    connection.on("close", () => {
      for (const key in subscriptions) {
        subscriptions[key]();
      }
      const index = clients.indexOf(connection);
      clients.splice(index, 1);
      console.log("peer disconnected");
    });
  });

  return { server, webSocketServer };
};

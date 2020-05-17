import { argv } from "yargs";
import { server as webSocketServer } from "websocket";
import http from "http";
import { Server as StaticServer } from "node-static";
import { ipc, nameofHandler } from "~/shared/ipc";

export const runWebServer = (port = 8080) => {
  const clients = [];

  const file = new StaticServer("./build");

  const server = http.createServer((req, res) => {
    file.serve(req, res);
  });

  server.listen(port, () => {
    console.log("Server is listening on port", port);
  });
  console.log(argv, !argv["ignore-cors"]);

  const wsServer = new webSocketServer({
    httpServer: server,
    autoAcceptConnections: !argv["ignore-cors"],
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
          const onMessage = (...args) => {
            if (isAuth) {
              connection.sendUTF(JSON.stringify({ type: "on", result: args }));
            }
          };
          subscriptions[data.channel] = ipcBus.subscribe(
            data.channel,
            onMessage
          );
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

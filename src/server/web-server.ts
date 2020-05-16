import { server as webSocketServer } from "websocket";
import http from "http";
import { Server as StaticServer } from "node-static";

export const runWebServer = (port = 8080) => {
  const clients = [];

  const file = new StaticServer("./build");

  const server = http.createServer((req, res) => {
    file.serve(req, res);
  });

  server.listen(port, () => {
    console.log("Server is listening on port", port);
  });

  const wsServer = new webSocketServer({
    httpServer: server,
  });

  wsServer.on("request", (request) => {
    console.log("connection from origin", request.origin);
    const connection = request.accept(null, request.origin);
    const index = clients.push(connection) - 1;
    console.log("connection accepted");

    const subscriptions = {};

    connection.on("message", async (message) => {
      if (message.type === "utf8") {
        const data = JSON.parse(message.utf8Data);
        if (data.type === "invoke") {
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
        } else if (data.type === "subscribe" && !subscriptions[data.channel]) {
          const onMessage = (...args) => {
            connection.sendUTF(JSON.stringify({ type: "on", result: args }));
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

    connection.on("close", (connection) => {
      clients.splice(index, 1);
      console.log("peer disconnected", connection.remoteAddress);
    });
  });

  return { server, webSocketServer };
};

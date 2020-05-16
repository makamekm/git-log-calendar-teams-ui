if (!window.isElectron) {
  const invokes = {};
  const subscriptions = {};

  window.WebSocket = window.WebSocket || window.MozWebSocket;

  const connection = new WebSocket(
    `ws://${"localhost:8080" || window.location.host}`
  );

  let resolveConnection;
  const awaitConnection = new Promise((r) => {
    resolveConnection = r;
  });

  connection.onopen = () => {
    console.log("connected with a server!");
    resolveConnection();
  };

  connection.onclose = (e) => {
    console.log(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  connection.onerror = function (err) {
    console.error("Socket encountered error: ", err.message, "Closing socket");
    connection.close();
  };

  connection.onmessage = (message) => {
    try {
      const data = JSON.parse(message.data);
      if (data.type === "invoke") {
        if (data.id && invokes[data.id]) {
          invokes[data.id].resolve(data.result);
        }
      } else if (data.type === "invoke_error") {
        if (data.id && invokes[data.id]) {
          invokes[data.id].reject(data.result);
        }
      } else if (data.type === "on") {
        if (subscriptions[data.channel]) {
          subscriptions[data.channel].forEach((fn) => fn(...data.result));
        }
      }
    } catch (e) {
      console.log("not valid JSON", message.data);
      return;
    }
  };

  const genId = () => String(Math.random() * 10000);
  const sendMessage = async (obj) => {
    await awaitConnection;
    connection.send(JSON.stringify(obj));
  };

  window.ipcBus.handle = async (channel, fn) => {
    throw new Error("You cannot handle from Renderer thread");
  };
  window.ipcBus.send = (channel, ...args) => {
    throw new Error("You cannot send from Renderer thread");
  };
  window.ipcBus.invoke = async (channel, ...args) => {
    let resolve = () => {};
    let reject = () => {};
    const promise = new Promise((r, e) => {
      resolve = r;
      reject = e;
    });
    const id = genId();
    invokes[id] = { resolve, reject };
    sendMessage({
      type: "invoke",
      id,
      channel,
      args,
    });
    return promise;
  };
  window.ipcBus.subscribe = (channel, callback) => {
    const listener = (...args) => {
      callback(...args);
    };
    if (!subscriptions[channel]) {
      subscriptions[channel] = [];
      sendMessage({
        type: "subscribe",
        channel,
      });
    }
    subscriptions[channel].push(listener);
    return () => {
      if (subscriptions[channel]) {
        const index = subscriptions[channel].indexOf(listener);
        if (index >= 0) {
          subscriptions[channel].splice(
            subscriptions[channel].indexOf(listener),
            1
          );
        }
        if (subscriptions[channel].length === 0) {
          delete subscriptions[channel];
          sendMessage({
            type: "unsubscribe",
            channel,
          });
        }
      }
    };
  };
}

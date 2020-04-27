import { EventEmitter } from "events";
import hyperswarm from "hyperswarm";
import { crypto_generichash, crypto_generichash_BYTES } from "sodium-universal";
import ndjson from "ndjson";
import { JsonCompatible } from "~/shared/Json";

export class Chat extends EventEmitter {
  private swarm;
  private channels = new Set<Channel>();
  private baseKey: string;

  constructor(baseKey: string, swarm?) {
    super();
    this.baseKey = baseKey;
    if (swarm) {
      this.swarm = swarm;
    } else {
      this.swarm = hyperswarm();
    }
    this.swarm.on("connection", this.handleConnection);
  }

  handleConnection = (connection, info) => {
    const peer = new Peer(connection, info);
    this.emit("peer", peer);
  };

  channel(name: string) {
    const key = Buffer.alloc(crypto_generichash_BYTES);
    crypto_generichash(key, name + this.baseKey);
    const keyString = key.toString("hex");
    const channel = new Channel(this, keyString, name);
    this.channels.add(channel);

    this.swarm.join(key, {
      announce: true,
      lookup: true,
    });

    this.emit("channel", channel);

    channel.once("closed", () => {
      this.swarm.leave(key);
      this.channels.delete(channel);
    });

    return channel;
  }

  destroy() {
    this.swarm.removeListener("connection", this.handleConnection);
    this.swarm.destroy();
    this.emit("destroyed");
  }
}

export class Channel extends EventEmitter {
  private chat: Chat;
  private key: string;
  private name: string;
  private peers = new Set<Peer>();

  getKey() {
    return this.key;
  }

  getName() {
    return this.name;
  }

  getPeers() {
    return this.peers;
  }

  constructor(chat: Chat, key: string, name: string) {
    super();

    this.name = name;
    this.key = key;
    this.chat = chat;
    this.peers = new Set();

    this.chat.on("peer", this.handlePeer);
  }

  handlePeer = (peer) => {
    peer.once("channel", (channel) => {
      if (channel === this.key) {
        this.addPeer(peer);
      }
    });
  };

  addPeer(peer) {
    this.peers.add(peer);
    this.emit("peer", peer);
    peer.once("disconnected", () => {
      this.peers.delete(peer);
      this.emit("peer-disconnected", peer);
    });
    peer.on("message", (data) => {
      this.emit("message", peer, data.message);
    });
  }

  send(message: JsonCompatible) {
    this.broadcast(message);
  }

  broadcast(data: JsonCompatible) {
    this.peers.forEach((peer) => {
      peer.send(data);
    });
  }

  isClosed() {
    return !this.chat;
  }

  close() {
    this.chat.removeListener("peer", this.handlePeer);
    this.peers.forEach((peer) => {
      peer.destroy();
    });
    this.emit("closed");
    this.chat = null;
  }
}

export class Peer extends EventEmitter {
  private connection;
  private incoming = ndjson.parse();
  private outgoing = ndjson.stringify();

  constructor(connection, info) {
    super();

    const peer = info.peer;
    this.connection = connection;
    connection.pipe(this.incoming);
    this.outgoing.pipe(connection);

    this.incoming.on("data", (data) => {
      this.emit("data", data);
      const { type } = data;
      this.emit(type, data);
    });

    this.connection.on("error", (e) => {
      this.emit("connection-error", e);
    });

    this.connection.once("close", () => {
      this.emit("disconnected");
    });

    if (peer && peer.topic) {
      const channel = peer.topic.toString("hex");
      this.sendData({
        type: "handshake",
        channel,
      });
      setTimeout(() => {
        this.emit("channel", channel);
      }, 0);
    } else {
      this.once("handshake", ({ channel }) => {
        this.sendData({
          type: "handshake",
          channel,
        });
        this.emit("channel", channel);
      });
    }
  }

  sendData(data: JsonCompatible) {
    this.outgoing.write(data);
  }

  send(message: JsonCompatible) {
    this.outgoing.write({
      type: "message",
      message,
    });
  }

  destroy() {
    this.emit("end", this);
    this.connection.end();
  }
}

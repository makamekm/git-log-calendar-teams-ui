const hyperdrive = require("hyperdrive");
const path = require("path");
const replicate = require("@hyperswarm/replicator");

// const crypto = require("hypercore-crypto");
// const keyPair = crypto.keyPair();
// fs.writeFileSync(path.resolve("pub.key"), keyPair.publicKey.toString("hex"));
// fs.writeFileSync(path.resolve("sec.key"), keyPair.secretKey.toString("hex"));

// const crypto = require("crypto");
// const key = crypto.randomBytes(32);

const publicKey = Buffer.from(
  "7a4337bda407e493aa252a159847838c4983e1ba2cbb127223455dfa54955d50",
  "hex"
);
const secretKey = Buffer.from(
  "9a923eddf9ed815184dd00cf828bc9bce7816e85b094be2390a2517c16608bd17a4337bda407e493aa252a159847838c4983e1ba2cbb127223455dfa54955d50",
  "hex"
);

const drive = hyperdrive(path.resolve("./test"), publicKey.toString("hex"), {
  secretKey,
});

// (() => {
//   const hyperswarm = require("hyperswarm");
//   const crypto = require("crypto");

//   const swarm = hyperswarm();

//   // look for peers listed under this topic
//   const topic = crypto.createHash("sha256").update("testmakame").digest();

//   swarm.join(topic, {
//     lookup: true, // find & connect to peers
//     announce: true, // optional- announce self as a connection target
//   });

//   swarm.on("connection", (socket, details) => {
//     console.log("new connection!", details.peer);

//     // you can now use the socket as a stream, eg:
//     // process.stdin.pipe(socket).pipe(process.stdout)
//   });
// })();

const hyperswarm = require("hyperswarm");
const pump = require("pump");

const swarm = hyperswarm();

// const crypto = require("crypto");
// look for peers listed under this topic
// const topic = crypto.createHash("sha256").update("testmakame").digest();

drive.on("ready", () => {
  swarm.join(publicKey, {
    announce: true,
    lookup: true,
  });
});

swarm.on("connection", function (connection, info) {
  const stream = drive.replicate({
    initiator: info.client,
    live: true,
    upload: true,
    download: true,
    encrypt: true,
  });

  pump(connection, stream, connection);
});

// const swarm = replicate(drive, {
//   discoveryKey: topic,
//   live: true,
//   upload: true,
//   download: true,
//   encrypt: true,
//   announce: true,
//   lookup: true,
//   includeLength: true,
//   // keyPair: {
//   //   publicKey,
//   //   secretKey,
//   // },
// });

swarm.on("connection", (socket, details) => {
  console.log("new connection!", details.peer);
});

const writeFile = (file, content) =>
  new Promise((r, e) => {
    drive.writeFile(file, content, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    });
  });

const readFile = (file, encoding = "utf-8") =>
  new Promise((r, e) => {
    drive.readFile(file, encoding, (err, data) => {
      if (err) {
        e(err);
      } else {
        r(data);
      }
    });
  });

const readDir = (dir) =>
  new Promise((r, e) => {
    drive.readdir(dir, (err, list) => {
      if (err) {
        e(err);
      } else {
        r(list);
      }
    });
  });

drive.on("ready", async () => {
  setTimeout(async () => {
    console.log(drive.writable);
    console.log("try to write a file!");
    await writeFile("/test.txt", "hello");
    // console.log(await readFile("/test.txt"));
    console.log(await readDir("/"));
    // console.log(await readFile("/git-log-config.yml"));
    // console.log("file written!");
    // fs.writeFileSync(path.resolve(".key"), drive.key);
  }, 1000);
});

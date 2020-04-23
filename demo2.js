const hyperdrive = require("hyperdrive");
const path = require("path");
const fs = require("fs");
const replicate = require("@hyperswarm/replicator");

// const crypto = require("hypercore-crypto");
// const keyPair = crypto.keyPair();
// fs.writeFileSync(path.resolve("pub.key"), keyPair.publicKey.toString("hex"));
// fs.writeFileSync(path.resolve("sec.key"), keyPair.secretKey.toString("hex"));

// const crypto = require("crypto");
// const key = crypto.randomBytes(32);

const readKeyFile = (file) => {
  return Buffer.from(fs.readFileSync(file, "utf8"), "hex");
};

const drive = hyperdrive(
  path.resolve("./test"),
  readKeyFile(path.resolve("pub.key")).toString("hex"),
  {
    secretKey: readKeyFile(path.resolve("sec.key")),
  }
);

const swarm = replicate(drive, {
  live: true,
  upload: true,
  download: true,
  encrypt: true,
  announce: true,
  lookup: true,
});

// swarm.join(topic, {
//   // bootstrap: [],
//   lookup: true, // find & connect to peers
//   announce: true, // optional- announce self as a connection target
// });

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

drive.on("ready", async () => {
  console.log(drive.writable);
  console.log("try to write a file!");
  // await writeFile("/test.txt", "hello");
  console.log(await readFile("/test.txt"));
  console.log("file written!");
  fs.writeFileSync(path.resolve(".key"), drive.key);
});

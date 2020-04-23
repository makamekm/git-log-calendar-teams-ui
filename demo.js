const hyperdrive = require("hyperdrive");
const path = require("path");
const fs = require("fs");
const replicate = require("@hyperswarm/replicator");

const publicKey = Buffer.from(
  "7a4337bda407e493aa252a159847838c4983e1ba2cbb127223455dfa54955d50",
  "hex"
);
const secretKey = Buffer.from(
  "9a923eddf9ed815184dd00cf828bc9bce7816e85b094be2390a2517c16608bd17a4337bda407e493aa252a159847838c4983e1ba2cbb127223455dfa54955d50",
  "hex"
);

const drive = hyperdrive(path.resolve("./test2"), publicKey.toString("hex"), {
  secretKey,
});

const swarm = replicate(drive, {
  live: true,
  upload: true,
  download: true,
  encrypt: true,
  announce: true,
  lookup: true,
  keyPair: {
    publicKey,
    secretKey,
  },
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

drive.on("ready", () => {
  setTimeout(async () => {
    console.log(drive.writable);
    console.log("try to read a file");
    // console.log(await readFile("/test.txt"));
    console.log("try to write a file");
    await writeFile("/test.txt", "dfgdfga!");
    console.log(await readFile("/test.txt"));
  }, 1000);
});

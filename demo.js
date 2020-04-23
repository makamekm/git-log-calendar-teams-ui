const hyperdrive = require("hyperdrive");
const path = require("path");
const fs = require("fs");
const replicate = require("@hyperswarm/replicator");

const readKeyFile = (file) => {
  return Buffer.from(fs.readFileSync(file, "utf8"), "hex");
};

const drive = hyperdrive(
  path.resolve("./my-cloned-hyperdrive"),
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
    console.log(await readFile("/test.txt"));
    console.log("try to write a file");
    await writeFile("/test.txt", "dfgdfga!");
    console.log(await readFile("/test.txt"));
  }, 1000);
});

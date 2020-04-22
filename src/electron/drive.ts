import hyperdrive from "hyperdrive";
import path from "path";
import { app } from "electron";

const BASE_FOLDER = path.resolve("./test") || app.getPath("temp");

let drive;

export const getDrive = () => drive;

export const writeFile = (file, content) =>
  new Promise<void>((r, e) => {
    drive.writeFile(file, content, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    });
  });

export const readFile = <T = string>(file, encoding = "utf-8") =>
  new Promise<T>((r, e) => {
    drive.readFile(file, encoding, (err, data) => {
      if (err) {
        e(err);
      } else {
        r(data);
      }
    });
  });

export const readDir = (dir) =>
  new Promise<string[]>((r, e) => {
    drive.readdir(dir, (err, list) => {
      if (err) {
        e(err);
      } else {
        r(list);
      }
    });
  });

export const rmDir = (dir) =>
  new Promise<void>((r, e) => {
    drive.rmdir(
      dir,
      {
        recursive: true,
      },
      (err) => {
        if (err) {
          e(err);
        } else {
          r();
        }
      }
    );
  });

export const unlink = (file) =>
  new Promise<void>((r, e) => {
    drive.unlink(file, (err) => {
      if (err) {
        e(err);
      } else {
        r();
      }
    });
  });

export const createDrive = () => {
  drive = hyperdrive(BASE_FOLDER);
};

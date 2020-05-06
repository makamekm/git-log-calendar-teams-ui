import numeral from "numeral";
import crypto from "hypercore-crypto";

export const numberWithCommas = (x: number) => {
  return numeral(x || 0).format("0,0");
};

export const generateDriveKeys = () => {
  const keyPair = crypto.keyPair();
  return {
    publicKey: keyPair.publicKey.toString("hex"),
    secretKey: keyPair.secretKey.toString("hex"),
  };
};

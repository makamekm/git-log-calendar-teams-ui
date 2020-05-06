import numeral from "numeral";

export const numberWithCommas = (x: number) => {
  return numeral(x || 0).format("0,0");
};

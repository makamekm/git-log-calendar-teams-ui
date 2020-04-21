export const numberWithCommas = (x: number) => {
  return (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

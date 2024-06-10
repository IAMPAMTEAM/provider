export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

export const random = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

export const sortBy = (key: string | number) => {
  return (a: { [x: string]: number }, b: { [x: string]: number }) =>
    a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
};

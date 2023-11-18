export function sumValue<T extends number>(...values: T[]) {
  return values.reduce((acc, cur) => acc + cur, 0);
}

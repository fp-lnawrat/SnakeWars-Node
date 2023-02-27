export const stopwatch = () => {
  let start = process.hrtime.bigint();
  return {
    elapsed: () => {
      let end = process.hrtime.bigint();
      return Number((end - start) / 100000n) / 10;
    },
    reset: () => {
      start = process.hrtime.bigint();
    }
  }
};

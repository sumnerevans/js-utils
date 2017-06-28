/**
 * Creates a generator that yields elements between the start and the stop
 * with the given step.
 *
 * @example array.range(10) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @example array.range(3, 10) => [3, 4, 5, 6, 7, 8, 9]
 * @example array.range(3, 10, 2) => [3, 5, 7, 9]
 *
 * @param {int} start/stop the beginning of the range, or if this is the only
 *                         parameter, then the end of the range
 * @param {int} stop the end of the range (not inclusive)
 * @param {int} step the step to increment by
 */
let range = function*(start, stop, step) {
  if (stop === undefined) {
    stop = start;
    start = 0
  }

  if (step === undefined) {
    step = 1;
  }

  for (let i = start; i < stop; i += step) {
    yield i;
  }

  return;
};

module.exports = {
  range: range,
};

/**
 * Creates a generator that yields elements between the start and the stop
 * with the given step.
 *
 * @example array.range(10) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * @example array.range(3, 10) => [3, 4, 5, 6, 7, 8, 9]
 * @example array.range(3, 10, 2) => [3, 5, 7, 9]
 *
 * @param {int} begin the beginning of the range, or if this is the only
 *                    parameter, then the end of the range
 * @param {int} end the end of the range (not inclusive)
 * @param {int} step the step to increment by
 *
 * @returns {generator} a generator for the range
 */
let range = function*(begin, end, step) {
  let start = typeof end === 'undefined' ? 0 : begin;
  let stop = end || begin;
  let increment = step || 1;

  for (let i = start; i < stop; i = i + increment) {
    yield i;
  }

  return;
};

module.exports = {
  range: range,
};

const array = require('./Array');
/**
 * Returns the maximum element in the array.
 *
 * @param {array}    arr         the array to find the minimum on
 * @param {function} [evaluator] the function to use to evaluate the value of
 *                               each element of the array.
 * @returns the maximum element in the array
 */
let max = function(arr, evaluator = (el) => el) {
  let maxEl = null;
  let maxEval = null;

  for (let el of arr) {
    let evaluatedValue = evaluator(el);

    if (evaluatedValue === false) {
      maxEl = el;
      break;
    }

    if (maxEl === null || evaluatedValue > maxEval) {
      maxEl = el;
      maxEval = evaluatedValue;
    }
  }

  return maxEl;
};

/**
 * Returns the minimum element in the array.
 *
 * @param {array}    arr         the array to find the maximum on
 * @param {function} [evaluator] the function to use to evaluate the value of
 *                               each element of the array.
 * @returns the minimum element in the array
 */
let min = function(arr, evaluator = (el) => el) {
  let minEl = null;
  let minEval = null;

  for (let el of arr) {
    let evaluatedValue = evaluator(el);

    if (evaluatedValue === false) {
      minEl = el;
      break;
    }

    if (minEl === null || evaluatedValue < minEval) {
      minEl = el;
      minEval = evaluatedValue;
    }
  }

  return minEl;
};

/**
 * Creates an sorted array of arrays according to the given evaluator
 * function. This can be chained with thenBy() calls.
 *
 * @param {array} array the array to sort
 * @param {function} evaluator the function to use to evaluate the value of
 *                             each element of the array
 * @returns {*} the sorted array
 */
let orderBy = function(array, evaluator) {
  array.sort((a, b) => {
    let aVal = evaluator(a);
    let bVal = evaluator(b);
    return aVal - bVal;
  });
  return array;
};

/**
 * Yields the elements of the array for which the evaluator returns true.
 *
 * @param {array} arr the array
 * @param {function} evaluator=el=>el the function to evaluate the elements
 * @yields the elements of the array for which the evaluator returns true.
 */
let where = function*(arr, evaluator = el => true) {
  for (let el of arr) {
    if (evaluator(el)) {
      yield el;
    }
  }
};

/**
 * Returns the maximum element in the array.
 *
 * @param {function} [evaluator] the function to use to evaluate the value of
 *                               each element of the array.
 * @returns the maximum element in the array
 */
Array.prototype.max = Array.prototype.max || function(evaluator) {
  return max(this, evaluator);
};

/**
 * Returns the minimum element in the array.
 *
 * @param {function} [evaluator] the function to use to evaluate the value of
 *                               each element of the array.
 * @returns the minimum element in the array
 */
Array.prototype.min = Array.prototype.min || function(evaluator) {
  return min(this, evaluator);
};

/**
 * Yields the elements of the array for which the evaluator returns true.
 *
 * @param {array} array the array
 * @param {function} evaluator=el=>el the function to evaluate the elements
 * @yields the elements of the array for which the evaluator returns true.
 */
Array.prototype.where = Array.prototype.where || function*(evaluator) {
  for (let el of where(this, evaluator)) {
    yield el;
  }
};

module.exports = {
  max: max,
  min: min,
  where: where,
};

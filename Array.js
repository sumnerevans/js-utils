define(function() {
  /**
   * Returns the maximum element in the array.
   *
   * @param {array}    array       the array to find the minimum on
   * @param {function} [evaluator] the function to use to evaluate the value of
   *                               each element of the array.
   * @returns the maximum element in the array
   */
  let max = function(array, evaluator = (el) => el) {
    let maxEl = null;
    let maxEval = null;

    for (let el of array) {
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
   * @param {array}    array       the array to find the maximum on
   * @param {function} [evaluator] the function to use to evaluate the value of
   *                               each element of the array.
   * @returns the minimum element in the array
   */
  let min = function(array, evaluator = (el) => el) {
    let minEl = null;
    let minEval = null;

    for (let el of array) {
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
   * Sort the array according to the given evaluator function.
   *
   * @param {array} array the array to sort
   * @param {function} evaluator the function to use to evaluate the value of
   *                             each element of the array.
   * @returns {*} the sorted array
   */
  let sortBy = function(array, evaluator) {
    array.sort((a, b) => {
      let aVal = evaluator(a);
      let bVal = evaluator(b);
      return aVal - bVal;
    });
    return array;
  };

  /**
   * Enumerate the array with the pair [index, value].
   *
   * @param {array} array the array to enumerate
   * @returns {array} yields the index and the value at that index.
   */
  let enumerate = function*(array) {
    for (let i = 0; i < array.length; i++) {
      yield [i, array[i]];
    }
  };

  // Add the functions to the Array prototype.
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
   * Sort the array according to the given evaluator function.
   *
   * @param {function} evaluator the function to use to evaluate the value of
   *                             each element of the array.
   * @returns {*} the sorted array
   */
  Array.prototype.sortBy = Array.prototype.sortBy || function(evaluator) {
    return sortBy(this, evaluator);
  };

  /**
   * Enumerate the array with the pair [index, value].
   *
   * @param {array} array the array to enumerate
   * @returns {array} yields the index and the value at that index.
   */
  Array.prototype.enumerate = Array.prototype.enumerate || function*() {
    for (let el of enumerate(this)) {
      yield el;
    }
  };

  return {
    enumerate: enumerate,
    max: max,
    min: min,
    sortBy: sortBy,
  };
});

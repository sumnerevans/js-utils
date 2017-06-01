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
      if (minEl === null || evaluatedValue < minEval) {
        minEl = el;
        minEval = evaluatedValue;
      }
    }

    return minEl;
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

  return {
    'max': max,
    'min': min,
  };
});

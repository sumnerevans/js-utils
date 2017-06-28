define(() => {
  /**
   * Enumerate the array with the pair [index, value].
   *
   * @param {array} array the array to enumerate
   * @yields an array with the index of the element and the element itself for
   *         each element of the original array.
   */
  let enumerate = function*(array) {
    for (let i = 0; i < array.length; i++) {
      yield [i, array[i]];
    }
  };

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

  /**
   * Removes the given indexes from the array.
   *
   * @param {array} array the array to remove elements from
   * @param {int} start the first index to remove
   * @param {int} stop the first index to remove
   * @returns {array} the array without the elements (note, the actual array
   *                  reference is modified)
   */
  let remove = function(array, start, stop) {
    stop = stop || start;
    array.splice(start, (stop - start) + 1);
    return array;
  };

  /**
   * Sort the array according to the given evaluator function.
   *
   * @param {array} array the array to sort
   * @param {function} evaluator the function to use to evaluate the value of
   *                             each element of the array
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
   * Yields the elements of the array for which the evaluator returns true.
   *
   * @param {array} array the array
   * @param {function} evaluator=el=>el the function to evaluate the elements
   * @yields the elements of the array for which the evaluator returns true.
   */
  let where = function*(array, evaluator = el => true) {
    for (let el of array) {
      if (evaluator(el)) {
        yield el;
      }
    }
  };

  // Add the functions to the Array prototype.
  /**
   * Enumerate the array with the pair [index, value].
   *
   * @param {array} array the array to enumerate
   * @yields an array with the index of the element and the element itself for
   *         each element of the original array.
   */
  Array.prototype.enumerate = Array.prototype.enumerate || function*() {
    for (let el of enumerate(this)) {
      yield el;
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
   * Removes the given indexes from the array.
   *
   * @param {int} start the first index to remove
   * @param {int} stop the first index to remove
   * @returns {array} the array without the elements (note, the actual array
   *                  reference is modified)
   */
  Array.prototype.remove = Array.prototype.remove || function(start, stop) {
    return remove(this, start, stop);
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

  /**
   * Convert a generator or string to an array.
   *
   * @param {iterable} source an iterable object
   * @returns {array} the array from the generator function
   */
  let array = function(source) {
    let arr = [];
    for (let el of source) {
      arr.push(el);
    }
    return arr;
  };

  array.enumerate = enumerate;
  array.max = max;
  array.min = min;
  array.range = range;
  array.remove = remove;
  array.sortBy = sortBy;
  array.where = where;

  return array;
});

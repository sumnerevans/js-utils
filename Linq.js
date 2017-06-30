require('./List');

/**
 * Returns the maximum element in the array.
 * @param {array}    arr         the array to find the minimum on
 * @param {function} [evaluator] the function to use to evaluate the value of
 *                               each element of the array.
 * @returns {*} the maximum element in the array
 */
let max = (arr, evaluator = el => el) => {
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
 * @returns {*} the minimum element in the array
 */
let min = (arr, evaluator = el => el) => {
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
 * function. thenBy() calls can be chained to this function.
 *
 * @param {array} array the array to sort
 * @param {function} evaluator the function to use to evaluate elements
 * @returns {array} the sorted array
 */
let orderBy = (array, evaluator) => {
  // Group the elements by their evaluated value.
  array.sortBy(evaluator);

  let prevEvaluated = null;
  let orderedArray = [];
  for (let el of array) {
    let evaled = evaluator(el);
    if (evaled !== prevEvaluated || prevEvaluated === null) {
      orderedArray.push([el]);
    } else {
      orderedArray[orderedArray.length - 1].push(el);
    }
    prevEvaluated = evaled;
  }

  // Keep track of the ordering level of the array so that when we compress, it
  // will be easy.
  orderedArray.orderingLevel = 1;
  return orderedArray;
};

/**
 * Sorts the individual arrays within an ordered array of arrays.
 *
 * @param {array} array the array to sort
 * @param {function} evaluator the function to use to evaluate the elements of
 *                             the sub-arrays
 * @returns {array} the sorted array of arrays
 */
let thenBy = (array, evaluator) => {
  for (let [i, el] of array.enumerate()) {
    array[i] = el.orderBy(evaluator);
  }

  // Add another level of ordering.
  array.orderingLevel++;
  return array;
};

/**
 * Spreads an ordered list iut into a single list.
 *
 * @param {array} array the grouped array to spread out
 * @returns {array} the compressed array
 */
let toList = (array) => {
  let spread = (arr, level) => {
    if (!level) {
      return arr;
    }

    // Recursively call spread until we get to the base level.
    let spreaded = [];
    for (let el of arr) {
      spreaded = spreaded.concat(spread(el, level - 1));
    }
    return spreaded;
  };

  return spread(array, array.orderingLevel);
};

/**
 * Yields the elements of the array for which the evaluator returns true.
 *
 * @param {array} arr the array
 * @param {function} evaluator=()=>true the function to evaluate the elements
 * @returns {generator} the elements of the array for which the evaluator returns true.
 */
let where = function*(arr, evaluator = () => true) {
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
 * @returns {*} the maximum element in the array
 */
Array.prototype.max = Array.prototype.max || function(evaluator) {
  return max(this, evaluator);
};

/**
 * Returns the minimum element in the array.
 *
 * @param {function} [evaluator] the function to use to evaluate the value of
 *                               each element of the array.
 * @returns {*} the minimum element in the array
 */
Array.prototype.min = Array.prototype.min || function(evaluator) {
  return min(this, evaluator);
};

/**
 * Creates an sorted array of arrays according to the given evaluator
 * function. thenBy() calls can be chained to this function.
 *
 * @param {function} evaluator the function to use to evaluate elements
 * @returns {array} the sorted array
 */
Array.prototype.orderBy = Array.prototype.orderBy || function(evaluator) {
  return orderBy(this, evaluator);
};

/**
 * Sorts the individual arrays within an ordered array of arrays.
 *
 * @param {function} evaluator the function to use to evaluate the elements of
 *                             the sub-arrays
 * @returns {array} the sorted array of arrays
 */
Array.prototype.thenBy = Array.prototype.thenBy || function(evaluator) {
  return thenBy(this, evaluator);
};

Array.prototype.toList = Array.prototype.toList || function(evaluator) {
  return toList(this, evaluator);
};

/**
 * Yields the elements of the array for which the evaluator returns true.
 *
 * @param {function} evaluator=el=>el the function to evaluate the elements
 * @returns {generator} the elements of the array for which the evaluator returns true.
 */
Array.prototype.where = Array.prototype.where || function*(evaluator) {
  for (let el of where(this, evaluator)) {
    yield el;
  }
};

module.exports = {
  max: max,
  min: min,
  orderBy: orderBy,
  thenBy: thenBy,
  toList: toList,
  where: where,
};

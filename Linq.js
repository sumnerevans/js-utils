require('./List');
const IndexOutOfBoundsException = require('./Exceptions').IndexOutOfBoundsException;
const RequiredParameterException = require('./Exceptions').RequiredParameterException;
const MultipeItemsMatchException = require('./Exceptions').MultipeItemsMatchException;
const NoItemFoundException = require('./Exceptions').NoItemFoundException;

/**
 * Calaculate the average of the elements of the array using the given
 * evaluator.
 *
 * @param {array} array the array to calculate the average for
 * @param {function} [evaluator=el=>el] the function to evaluate the elements of
 *                                      the array with
 * @returns {number} the average
 */
const average = function(array, evaluator = el => el) {
  return array.sum(evaluator) / array.length;
};

/**
 * Gets the element at the given index or blows up if the index is out of the
 * bounds of the array.
 *
 * @param {array} array the array to get an element from
 * @param {number} index the index
 * @returns {*} the element at the given index
 * @throws IndexOutOfBoundsException
 * @throws RequiredParameterException
 */
const elementAt = function(array, index) {
  if (typeof index === 'undefined') {
    throw new RequiredParameterException('index');
  }

  if (index < 0 || index > array.length - 1) {
    throw new IndexOutOfBoundsException();
  }
  return array[index];
};

/**
 * Gets the element at the given index or returns the default value if the
 * index is out of bounds.
 *
 * @param {array} array the array to get the element from
 * @param {number} index the index
 * @param {*} [defaultVal=null] the default value
 * @returns {*} the element at the given index or the default value
 * @throws RequiredParameterException
 */
const elementAtOrDefault = function(array, index, defaultVal = null) {
  if (typeof index === 'undefined') {
    throw new RequiredParameterException('index');
  }

  try {
    return elementAt(array, index);
  } catch (e) {
    return defaultVal;
  }
};

/**
 * Gets the first value in the array which matches the given evaluator.
 *
 * @param {array} array the array to find the first item of
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @returns {*} the first element of the array that matches the evaluator
 * @throws Error Sequence contains no matching element
 */
const first = function(array, evaluator = () => true) {
  for (const el of array) {
    if (evaluator(el)) {
      return el;
    }
  }

  throw Error('Sequence contains no matching element');
};

/**
 * Gets the first value in the array which matches the given evaluator or if no
 * element is found, the default.
 *
 * @param {array} array the array to find the first item of
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @param {*} [defaultVal=null] the default value to return
 * @returns {*} the first element of the array that matches the evaluator
 */
const firstOrDefault = function(array, evaluator = () => true,
                                defaultVal = null) {
  if (typeof evaluator !== 'function' && defaultVal === null) {
    defaultVal = evaluator;
    evaluator = () => true;
  }

  try {
    return first(array, evaluator);
  } catch (e) {
    return defaultVal;
  }
};

/**
 * Gets the last value in the array which matches the given evaluator.
 *
 * @param {array} array the array to find the last item of
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @returns {*} the last element of the array that matches the evaluator
 * @throws Error Sequence contains no matching element
 */
const last = function(array, evaluator = () => true) {
  for (const el of array.reversed()) {
    if (evaluator(el)) {
      return el;
    }
  }

  throw Error('Sequence contains no matching element');
};

/**
 * Gets the last value in the array which matches the given evaluator or if no
 * element is found, the default.
 *
 * @param {array} array the array to find the last item of
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @param {*} [defaultVal=null] the default value to return
 * @returns {*} the last element of the array that matches the evaluator
 */
const lastOrDefault = function(array, evaluator = () => true,
                               defaultVal = null) {
  if (typeof evaluator !== 'function' && defaultVal === null) {
    defaultVal = evaluator;
    evaluator = () => true;
  }

  try {
    return last(array, evaluator);
  } catch (e) {
    return defaultVal;
  }
};


/**
 * Returns the maximum element in the array.
 * @param {array}    arr         the array to find the minimum on
 * @param {function} [evaluator=el=>el] the function to use to evaluate the
 *                                      value of each element of the array.
 * @returns {*} the maximum element in the array
 */
const max = function(arr, evaluator = el => el) {
  let maxEl = null;
  let maxEval = null;

  for (const el of arr) {
    const evaluatedValue = evaluator(el);

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
 * @param {function} [evaluator=el=>el] the function to use to evaluate the
 *                                      value of each element of the array.
 * @returns {*} the minimum element in the array
 */
const min = function(arr, evaluator = el => el) {
  let minEl = null;
  let minEval = null;

  for (const el of arr) {
    const evaluatedValue = evaluator(el);

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
const orderBy = function(array, evaluator) {
  // Group the elements by their evaluated value.
  array.sortBy(evaluator);

  let prevEvaluated = null;
  const orderedArray = [];
  for (const el of array) {
    const evaled = evaluator(el);
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
 * Compares the elements of the array using the given comparator.
 *
 * @param {array} array the first array to compare
 * @param {array} otherArray the second array to compare
 * @param {function} [comparator=(a, b)=>a===b] the function to use to compare
 *                                              the elements of the array
 * @returns {bool} whether or not the two arrays are equal
 */
const sequenceEqual = function(array, otherArray,
                               comparator = (a, b) => a === b) {
  if (array.length !== otherArray.length) {
    return false;
  }

  for (const [i, el] of array.enumerate()) {
    if (!comparator(el, otherArray[i])) {
      return false;
    }
  }

  return true;
};


/**
 * Gets the element that matches the lambda, if no element or multiple element
 * match, it will throw an exception.
 *
 * @param {array} array the array to search in
 * @param {function} [evaluator=()=>true] the evaluator to determine which
 *                                        element to grab
 * @returns {*} the element that matched
 * @throws MultipeItemsMatchException
 * @throws NoItemFoundException
 */
const single = function(array, evaluator = () => true) {
  let returnVal;
  for (const el of array) {
    if (evaluator(el)) {
      if (typeof returnVal !== 'undefined') {
        throw new MultipeItemsMatchException();
      }

      returnVal = el;
    }
  }

  if (typeof returnVal === 'undefined') {
    throw new NoItemFoundException();
  }
  return returnVal;
};

/**
 * Gets the element that matches the lambda, if multiple elements match, it
 * will throw an exception. If no element matches, the default will be
 * returned.
 *
 * @param {array} array the array to search in
 * @param {function} [evaluator=()=>true] the evaluator to determine which
 *                                        element to grab
 * @param {*} defaultVal the default value to return if no element matches
 * @returns {*} the element that matched
 * @throws MultipeItemsMatchException
 */
const singleOrDefault = function(array, evaluator = () => true,
                                 defaultVal = null) {
  if (typeof evaluator !== 'function' && defaultVal === null) {
    defaultVal = evaluator;
    evaluator = () => true;
  }

  try {
    return single(array, evaluator);
  } catch (e) {
    if (e instanceof NoItemFoundException) {
      return defaultVal;
    }
    throw e;
  }
};

/**
 * Sums the elements of the array using the given evaluator.
 *
 * @param {array} array the array to calculate the sum for
 * @param {function} [evaluator=el=>el] a function to evaluate each element of
 *                                      the array for the summation
 * @returns {number} the sum of the elements
 */
const sum = function(array, evaluator = el => el) {
  let total = 0;
  for (const el of array) {
    total += evaluator(el);
  }
  return total;
};

/**
 * Sorts the individual arrays within an ordered array of arrays.
 *
 * @param {array} array the array to sort
 * @param {function} evaluator the function to use to evaluate the elements of
 *                             the sub-arrays
 * @returns {array} the sorted array of arrays
 */
const thenBy = function(array, evaluator) {
  for (const [i, el] of array.enumerate()) {
    array[i] = el.orderBy(evaluator);
  }

  // Add another level of ordering.
  array.orderingLevel++;
  return array;
};

/**
 * Spreads an ordered list out into a single list.
 *
 * @param {array} array the grouped array to spread out
 * @returns {array} the compressed array
 */
const toList = function(array) {
  const flatten = (arr, level) => {
    if (!level) {
      return arr;
    }

    // Recursively flatten until we get to the base level.
    return arr.reduce(
      (compressed, current) => compressed.concat(flatten(current, level - 1)),
      []);
  };

  return flatten(array, array.orderingLevel);
};

/**
 * Returns the elements of the array for which the evaluator returns true.
 *
 * @param {array} array the array
 * @param {function} evaluator the function to evaluate the elements
 * @returns {array} the elements of the array for which the evaluator returns
 *                  true.
 */
const where = (array, evaluator) => array.where(evaluator);

/**
 * Calaculate the average of the elements of the array using the given
 * evaluator.
 *
 * @param {function} [evaluator=el=>el] the function to evaluate the elements
 *                                      of the array with
 * @returns {number} the average
 */
Array.prototype.average = Array.prototype.average || function(evaluator) {
  return average(this, evaluator);
};

/**
 * Gets the element at the given index or blows up if the index is out of the
 * bounds of the array.
 *
 * @param {number} index the index
 * @returns {*} the element at the given index
 * @throws IndexOutOfBoundsException
 */
Array.prototype.elementAt = Array.prototype.elementAt || function(index) {
  return elementAt(this, index);
};

/**
 * Gets the element at the given index or returns the default value if the
 * index is out of bounds.
 *
 * @param {number} index the index
 * @param {*} [defaultVal=null] the default value
 * @returns {*} the element at the given index or the default value
 * @throws RequiredParameterException
 */
Array.prototype.elementAtOrDefault = Array.prototype.elementAtOrDefault ||
  function(index, defaultVal) {
    return elementAtOrDefault(this, index, defaultVal);
  };

/**
 * Gets the first value in the array which matches the given evaluator.
 *
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @returns {*} the first element of the array that matches the evaluator
 * @throws Error Sequence contains no matching element
 */
Array.prototype.first = Array.prototype.first || function(evaluator) {
  return first(this, evaluator);
};

/**
 * Gets the first value in the array which matches the given evaluator or if no
 * element is found, the default.
 *
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @param {*} [defaultVal=null] the default value to return
 * @returns {*} the first element of the array that matches the evaluator
 */
Array.prototype.firstOrDefault = Array.prototype.firstOrDefault ||
  function(evaluator, defaultVal) {
    return firstOrDefault(this, evaluator, defaultVal);
  };

/**
 * Gets the last value in the array which matches the given evaluator.
 *
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @returns {*} the last element of the array that matches the evaluator
 * @throws Error Sequence contains no matching element
 */
Array.prototype.last = Array.prototype.last || function(evaluator) {
  return last(this, evaluator);
};

/**
 * Gets the last value in the array which matches the given evaluator or if no
 * element is found, the default.
 *
 * @param {evaluator} [evaluator=()=>true] the function to use to evaluate the
 *                                         elements of the array
 * @param {*} [defaultVal=null] the default value to return
 * @returns {*} the last element of the array that matches the evaluator
 */
Array.prototype.lastOrDefault = Array.prototype.lastOrDefault ||
  function(evaluator, defaultVal) {
    return lastOrDefault(this, evaluator, defaultVal);
  };

/**
 * Returns the maximum element in the array.
 *
 * @param {function} [evaluator=el=>el] the function to use to evaluate the
 *                                      value of each element of the array.
 * @returns {*} the maximum element in the array
 */
Array.prototype.max = Array.prototype.max || function(evaluator) {
  return max(this, evaluator);
};

/**
 * Returns the minimum element in the array.
 *
 * @param {function} [evaluator=el=>el] the function to use to evaluate the
 *                                      value of each element of the array.
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
 * Compares the elements of the array using the given comparator.
 *
 * @param {array} otherArray the second array to compare
 * @param {function} [comparator=(a, b)=>a===b] the function to use to compare
 *                                              the elements of the array
 * @returns {bool} whether or not the two arrays are equal
 */

Array.prototype.sequenceEqual = Array.prototype.sequenceEqual ||
  function(otherArray, comparator) {
    return sequenceEqual(this, otherArray, comparator);
  };

/**
 * Gets the element that matches the lambda, if no element or multiple element
 * match, it will throw an exception.
 *
 * @param {function} [evaluator=()=>true] the evaluator to determine which
 *                                        element to grab
 * @returns {*} the element that matched
 * @throws MultipeItemsMatchException
 * @throws NoItemFoundException
 */
Array.prototype.single = Array.prototype.single || function(evaluator) {
  return single(this, evaluator);
};

/**
 * Gets the element that matches the lambda, if multiple elements match, it
 * will throw an exception. If no element matches, the default will be
 * returned.
 *
 * @param {function} [evaluator=()=>true] the evaluator to determine which
 *                                        element to grab
 * @param {*} defaultVal the default value to return if no element matches
 * @returns {*} the element that matched
 * @throws MultipeItemsMatchException
 */
Array.prototype.singleOrDefault = Array.prototype.singleOrDefault ||
  function(evaluator, defaultVal) {
    return singleOrDefault(this, evaluator, defaultVal);
  };

/**
 * Sums the elements of the array using the given evaluator.
 *
 * @param {function} [evaluator=el=>el] a function to evaluate each element of
 *                                      the array for the summation
 * @returns {number} the sum of the elements
 */
Array.prototype.sum = Array.prototype.sum || function(evaluator) {
  return sum(this, evaluator);
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

/**
 * Spreads an ordered list out into a single list.
 *
 * @returns {array} the compressed array
 */
Array.prototype.toList = Array.prototype.toList || function() {
  return toList(this);
};

/**
 * Returns the elements of the array for which the evaluator returns true.
 *
 * @param {function} evaluator the function to use to evaluate the value of
 *                             each element of the array.
 * @returns {array} the elements of the array for which the evaluator returns
 *                  true.
 */
Array.prototype.where = Array.prototype.where || Array.prototype.filter;

module.exports = {
  average: average,
  elementAt: elementAt,
  elementAtOrDefault: elementAtOrDefault,
  first: first,
  firstOrDefault: firstOrDefault,
  last: last,
  lastOrDefault: lastOrDefault,
  max: max,
  min: min,
  orderBy: orderBy,
  sequenceEqual: sequenceEqual,
  single: single,
  singleOrDefault: singleOrDefault,
  sum: sum,
  thenBy: thenBy,
  toList: toList,
  where: where,
};

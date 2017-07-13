import './List';
import {
  IndexOutOfBoundsException,
  RequiredParameterException,
  MultipleItemsMatchException,
  NoItemFoundException,
} from './Exceptions';

/**
 * Returns true if all of the elements of the array match the evaluator.
 *
 * @param {array} array the array to evaluate
 * @param {function} evaluator the function to evaluate each element with
 * @returns {bool} true if all of the elements match the evaluator, false
 *                      otherwise
 */
const all = function(array, evaluator) {
  for (const el of array) {
    if (!evaluator(el)) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if at least one of the elements in the array matches the
 * evaluator.
 *
 * @param {array} array the array to evaluate
 * @param {function} evaluator the function to evaluate each element with
 * @returns {bool} true if at least one of the elements matches the evaluator,
 *                      false otherwise
 */
const any = function(array, evaluator) {
  for (const el of array) {
    if (evaluator(el)) {
      return true;
    }
  }
  return false;
};

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
 * Determines if the array contains the given element.
 *
 * @param {array} array the array to inspect
 * @param {*} element the element of the array to find
 * @param {function} equalityEvaluator a function to compare the array elements
 *                                     with the search element
 * @returns {bool} whether or not the array contains the given element
 */
const contains = function(array, element,
                          equalityEvaluator = (a, b) => a === b) {
  for (const el of array) {
    if (equalityEvaluator(el, element)) {
      return true;
    }
  }
  return false;
};

/**
 * Returns the number of elements of the array which match the evaluator.
 *
 * @param {array} array the array to evaluate
 * @param {function} [evaluator=()=>true] function to determine whether or not
 *                                        for an element to be included in the
 *                                        count
 * @returns {number} the number of elements where the evaluator is true
 */
const count = function(array, evaluator = () => true) {
  return array.where(evaluator).length;
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
 * Selects elements from the array using the given selector.
 *
 * @param {array} array the array to select from
 * @param {function} selector the function to use to select the elements
 * @returns {array} the selected elements
 */
const select = (array, selector) => array.select(selector);

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
 * @throws MultipleItemsMatchException
 * @throws NoItemFoundException
 */
const single = function(array, evaluator = () => true) {
  let returnVal;
  for (const el of array) {
    if (evaluator(el)) {
      if (typeof returnVal !== 'undefined') {
        throw new MultipleItemsMatchException();
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
 * @throws MultipleItemsMatchException
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
 * Returns the elements of the array starting at the first element that does
 * not match the evaluator.
 *
 * @param {array} array the array to get elements from
 * @param {function} evaluator the evaluation function
 * @returns {generator} the elements of the array
 */
const skipWhile = function*(array, evaluator) {
  let foundMatch = false;
  for (const [i, el] of array.enumerate()) {
    if (!foundMatch && evaluator(el, i)) {
      continue;
    }
    foundMatch = true;
    yield el;
  }
};

/**
 * Returns elements of the array starting at the Nth element.
 *
 * @param {array} array the array to get elements from
 * @param {number} elementsToSkip (N) the number of elements to skip before
 *                                starting to take
 * @returns {generator} the elements of the array after the Nth
 */
const skip = function*(array, elementsToSkip) {
  yield* skipWhile(array, (el, i) => i < elementsToSkip);
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
 * Returns the elements of the array until the first element that matches the
 * evaluator.
 *
 * @param {array} array the array to get elements from
 * @param {function} evaluator the evaluation function
 * @returns {generator} the elements of the array
 */
const takeWhile = function*(array, evaluator) {
  for (const [i, el] of array.enumerate()) {
    if (!evaluator(el, i)) {
      return;
    }
    yield el;
  }
};

/**
 * Returns elements first N elements of the array.
 *
 * @param {array} array the array to get elements from
 * @param {number} elementsToTake (N) the number of elements to take
 * @returns {generator} the elements of the array after the Nth
 */
const take = function*(array, elementsToTake) {
  yield* takeWhile(array, (el, i) => i < elementsToTake);
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
 * @param {array} source the grouped array to spread out or generator
 * @returns {array} the compressed array
 */
const toList = function(source) {
  const flatten = (array, level) => {
    if (!level) {
      return array;
    }

    // Recursively flatten until we get to the base level.
    return array.reduce(
      (compressed, current) => compressed.concat(flatten(current, level - 1)),
      []);
  };

  return flatten(source, source.orderingLevel);
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
 * Returns true if all of the elements of the array match the evaluator.
 *
 * @param {function} evaluator the function to evaluate each element with
 * @returns {bool} true if all of the elements match the evaluator, false
 *                      otherwise
 */
Array.prototype.all = Array.prototype.all || function(evaluator) {
  return all(this, evaluator);
};

/**
 * Returns true if at least one of the elements in the array matches the
 * evaluator.
 *
 * @param {function} evaluator the function to evaluate each element with
 * @returns {bool} true if at least one of the elements matches the evaluator,
 *                      false otherwise
 */
Array.prototype.any = Array.prototype.any || function(evaluator) {
  return any(this, evaluator);
};

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
 * Determines if the array contains the given element.
 *
 * @param {*} element the element of the array to find
 * @param {function} equalityEvaluator a function to compare the array elements
 *                                     with the search element
 * @returns {bool} whether or not the array contains the given element
 */
Array.prototype.contains = Array.prototype.contains ||
  function(element, equalityEvaluator) {
    return contains(this, element, equalityEvaluator);
  };

/**
 * Returns the number of elements of the array which match the evaluator.
 *
 * @param {function} [evaluator=()=>true] function to determine whether or not
 *                                        for an element to be included in the
 *                                        count
 * @returns {number} the number of elements where the evaluator is true
 */
Array.prototype.count = Array.prototype.count || function(evaluator) {
  return count(this, evaluator);
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
 * Selects elements from the array using the given selector.
 *
 * @param {function} selector the function to use to select the elements
 * @returns {array} the selected elements
 */
Array.prototype.select = Array.prototype.select || Array.prototype.map;

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
 * @throws MultipleItemsMatchException
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
 * @throws MultipleItemsMatchException
 */
Array.prototype.singleOrDefault = Array.prototype.singleOrDefault ||
  function(evaluator, defaultVal) {
    return singleOrDefault(this, evaluator, defaultVal);
  };

/**
 * Returns elements of the array starting at the Nth element.
 *
 * @param {number} elementsToSkip the number of elements to skip before
 *                                starting to take
 * @returns {generator} the elements of the array after the Nth
 */
Array.prototype.skip = Array.prototype.skip || function(elementsToSkip) {
  return skip(this, elementsToSkip);
};

/**
 * Returns the elements of the array starting at the first element that does
 * not match the evaluator.
 *
 * @param {function} evaluator the evaluation function
 * @returns {generator} the elements of the array
 */
Array.prototype.skipWhile = Array.prototype.skipWhile || function(evaluator) {
  return skipWhile(this, evaluator);
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
 * Returns elements first N elements of the array.
 *
 * @param {number} elementsToTake (N) the number of elements to take
 * @returns {generator} the elements of the array after the Nth
 */
Array.prototype.take = Array.prototype.take || function(elementsToTake) {
  return take(this, elementsToTake);
};

/**
 * Returns the elements of the array until the first element that matches the
 * evaluator.
 *
 * @param {function} evaluator the evaluation function
 * @returns {generator} the elements of the array
 */
Array.prototype.takeWhile = Array.prototype.takeWhile || function(evaluator) {
  return takeWhile(this, evaluator);
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

export default {
  all: all,
  any: any,
  average: average,
  contains: contains,
  count: count,
  elementAt: elementAt,
  elementAtOrDefault: elementAtOrDefault,
  first: first,
  firstOrDefault: firstOrDefault,
  last: last,
  lastOrDefault: lastOrDefault,
  max: max,
  min: min,
  orderBy: orderBy,
  select: select,
  sequenceEqual: sequenceEqual,
  single: single,
  singleOrDefault: singleOrDefault,
  skip: skip,
  skipWhile: skipWhile,
  sum: sum,
  take: take,
  takeWhile: takeWhile,
  thenBy: thenBy,
  toList: toList,
  where: where,
};

/**
 * Enumerate the array with the pair [index, value].
 *
 * @param {array} array the array to enumerate
 * @returns {generator} an array with the index of the element and the element
 *                      itself for each element of the original array.
 */
let enumerate = function*(array) {
  for (let i = 0; i < array.length; i++) {
    yield [i, array[i]];
  }
};

/**
 * Removes the given indexes from the array.
 *
 * @param {array} array the array to remove elements from
 * @param {int} start the first index to remove
 * @param {int} end the last index to remove
 * @returns {array} the array without the elements (note, the actual array
 *                  reference is modified)
 */
let remove = function(array, start, end) {
  const stop = end || start;
  array.splice(start, (stop - start) + 1);
  return array;
};

/**
 * Returns a generator that iterates through the list backwards.
 *
 * @param {array} array the array to iterate on
 * @returns {generator} a generator which outputs the elements of the array in
 *                      a reversed order
 */
let reversed = function*(array) {
  for(let i = array.length - 1; i >= 0; i--) {
    yield array[i];
  }
  return;
};

/**
 * Sort the array according to the given evaluator function.
 *
 * @param {array} array the array to sort
 * @param {function} evaluator the function to use to evaluate the value of
 *                             each element of the array
 * @returns {array} the sorted array
 */
let sortBy = function(array, evaluator) {
  array.sort((a, b) => {
    let aVal = evaluator(a);
    let bVal = evaluator(b);
    return aVal - bVal;
  });
  return array;
};

// Add the functions to the Array prototype.
/**
 * Enumerate the array with the pair [index, value].
 *
 * @param {array} array the array to enumerate
 * @returns {generator} an array with the index of the element and the element
 *                      itself for each element of the original array.
 */
Array.prototype.enumerate = Array.prototype.enumerate || function*() {
  for (let el of enumerate(this)) {
    yield el;
  }
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
 * Returns a generator that iterates through the list backwards.
 *
 * @returns {generator} a generator which outputs the elements of the array in
 *                      a reversed order
 */
Array.prototype.reversed = Array.prototype.reversed || function*() {
  for (let el of reversed(this)) {
    yield el;
  }
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
array.remove = remove;
array.reversed = reversed;
array.sortBy = sortBy;

module.exports = array;

/**
 * Formats a string given a set of fomat arguments.
 *
 * @example string.format('My name is {0}. Welcome to {1}.', 'Bob', 'Denver');
 *          => 'My name is Bob. Welcome to Denver.'
 *
 * @param {string} str           the string to format.
 * @param {...string} formatArgs the values to use for formatting the string
 * @returns {string}             the formatted string
 */
const format = function(str, ...formatArgs) {
  let formattedString = str;
  for (let i = 0; i < formatArgs.length; i++) {
    const reg = new RegExp(`\\{${i}\\}`, 'gm');

    let replacementString = formatArgs[i];
    if (replacementString.toString) {
      replacementString = replacementString.toString();
    }

    formattedString = formattedString.replace(reg, replacementString);
  }

  return formattedString;
};

/**
 * Joins an array together using the string as the separator.
 *
 * @param {string} separator the array to join
 * @param {array} array the array to join
 * @returns {string} the joined array
 */
const join = function(separator, array) {
  return array.join(separator);
};

/**
 * Get the ordinal (ASCII) value of the given character.
 *
 * @param {string} str the char to get the ordinal value of.
 * @returns {number} the ordinal value of the character.
 */
const ord = function(str) {
  if (str.length !== 1) {
    throw Error('String.ord expected a string of length 1.');
  }
  return str.charCodeAt(0);
};

// Comparison Functions
const comparers = {
  /**
   * Compares strings case insensitively.
   *
   * @param {string} a the first string to compare
   * @param {string} b the second string to compare
   * @returns {bool} whether or not the strings are the same (case
   *                 insensitvely)
   */
  ignoreCase: (a, b) => a.toLowerCase() === b.toLowerCase(),
};

// Add the functions to the String prototype.
/**
 * Formats a string given a set of fomat arguments.
 *
 * @example 'My name is {0}. Welcome to {1}.'.format('Bob', 'Denver');
 *          => 'My name is Bob. Welcome to Denver.'
 *
 * @param {...string} formatArgs the values to use for formatting the string
 * @returns {string}             the formatted string
 */
String.prototype.format = String.prototype.format || function(...formatArgs) {
  return format(this, ...formatArgs);
};

/**
 * Joins an array together using the string as the separator.
 *
 * @param {array} array the array to join
 * @returns {string} the joined array
 */
String.prototype.join = String.prototype.join || function(array) {
  return join(this, array);
};

/**
 * Get the ordinal (ASCII) value of the given character.
 *
 * @returns {number} the ordinal value of the character.
 */
String.prototype.ord = String.prototype.ord || function() {
  return ord(this);
};

export default {
  comparers: comparers,
  format: format,
  join: join,
  ord: ord,
};

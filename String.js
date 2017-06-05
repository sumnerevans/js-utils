define(function() {
  /**
   * Returns the maximum element in the array.
   *
   * @example 'My name is {0}. Welcome to {1}.'.format('Bob', 'Denver');
   *          => 'My name is Bob. Welcome to Denver.'
   *
   * @param {string} str              the string to format.
   * @param {...string} ...formatArgs the values to use for formatting the
   *                                  string
   * @returns {string}                the formatted string
   */
  let format = function(str, ...formatArgs) {
    let formattedString = str;
    for (let i = 0; i < formatArgs.length; i++) {
      let reg = new RegExp('\\{' + i + '\\}', 'gm');

      let replacementString = formatArgs[i];
      if (replacementString.toString) {
        replacementString = replacementString.toString();
      }

      formattedString = formattedString.replace(reg, replacementString);
    }

    return formattedString;
  };

  // Add the functions to the String prototype.
  /**
   * Returns the maximum element in the array.
   *
   * @example 'My name is {0}. Welcome to {1}.'.format('Bob', 'Denver');
   *          => 'My name is Bob. Welcome to Denver.'
   *
   * @param {...string} ...formatArgs the values to use for formatting the
   *                                  string
   * @returns {string}                the formatted string
   */
  String.prototype.format = String.prototype.format || function(...formatArgs) {
    return format(this, ...formatArgs);
  };

  return {
    format: format,
  };
});

define(function() {
  /**
   * Returns the maximum element in the array.
   *
   * @example 'My name is {0}. Welcome to {1}.'.format('Bob', 'Denver');
   *          => 'My name is Bob. Welcome to Denver.'
   *
   * @param {function} [evaluator] the function to use to evaluate the value of
   *                               each element of the array.
   * @returns the maximum element in the array
   */
  let format = function(string, ...formatArgs) {
    let formattedString = string;
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
  String.prototype.format = String.prototype.format || function(...formatArgs) {
    return format(this, ...formatArgs);
  };

  return {
    'format': format,
  };
});

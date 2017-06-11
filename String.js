define(() => {
  /**
   * Formats a string given a set of fomat arguments.
   *
   * @example string.format('My name is {0}. Welcome to {1}.', 'Bob', 'Denver');
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

  /**
   * Get the ordinal (ASCII) value of the given character.
   *
   * @param {string} str the char to get the ordinal value of.
   * @returns {number} the ordinal value of the character.
   */
  let ord = function(str) {
    if (str.length !== 1) {
      throw 'String.ord expected a string of length 1.';
    }
    return str.charCodeAt(0);
  };

  // Add the functions to the String prototype.
  /**
   * Formats a string given a set of fomat arguments.
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

  /**
   * Get the ordinal (ASCII) value of the given character.
   *
   * @returns {number} the ordinal value of the character.
   */
  String.prototype.ord = String.prototype.ord || function() {
    return ord(this);
  };

  return {
    format: format,
    ord: ord,
  };
});

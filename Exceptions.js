/**
 * A required parameter is missing.
 *
 * @extends {Error}
 * @class
 */
class RequiredParameterException extends Error {
  /**
   * Creates a RequiredParameterException
   *
   * @param {string} paramName the name of the parameter
   */
  constructor(paramName) {
    if (!paramName) {
      throw new Error('RequiredParameterException requires a parameter name');
    }

    super(`Parameter ${paramName} must be specified.`);
  }
}

/**
 * The requested index of the array was out of bounds.
 *
 * @extends {Error}
 * @class
 */
class IndexOutOfBoundsException extends Error {
  /**
   * Creates an IndexOutOfBoundsException
   *
   * @param {number} index the index that was attempted to be retrieved
   */
  constructor(index) {
    if (typeof index === 'undefined') {
      throw new RequiredParameterException('index');
    }

    super(`The index ${index} is out of bounds.`);
  }
}

/**
 * There were multiple items which matched the expression.
 *
 * @extends {Error}
 * @class
 */
class MultipeItemsMatchException extends Error {
  /**
   * Creates a MultipeItemsMatchException
   */
  constructor() {
    super('There were multiple items which matched the expression');
  }
}

/**
 * There were no items which matched the expression.
 *
 * @extends {Error}
 * @class
 */
class NoItemFoundException extends Error {
  /**
   * Creates a NoItemFoundException
   */
  constructor() {
    super('There were no items which matched the expression');
  }
}

module.exports = {
  IndexOutOfBoundsException: IndexOutOfBoundsException,
  RequiredParameterException: RequiredParameterException,
  MultipeItemsMatchException: MultipeItemsMatchException,
  NoItemFoundException: NoItemFoundException,
};

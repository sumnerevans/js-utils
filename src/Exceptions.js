/**
 * A required parameter is missing.
 *
 * @extends {Error}
 * @class
 */
export class RequiredParameterException extends Error {
  /**
   * Creates a RequiredParameterException
   *
   * @param {string} paramName the name of the parameter
   */
  constructor(paramName) {
    if (!paramName) {
      throw new Error('RequiredParameterException requires a parameter name');
    }

    super(`Parameter "${paramName}" must be specified.`);
  }
}

/**
 * The requested index of the array was out of bounds.
 *
 * @extends {Error}
 * @class
 */
export class IndexOutOfBoundsException extends Error {
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
 * A parameter was invalid.
 *
 * @extends {Error}
 * @class
 */
export class InvalidParameterException extends Error {
  /**
   * Creates an InvalidParameterException
   *
   * @param {string} paramName the parameter name that was invalid
   * @param {string} reason the reason the parameter was invalid
   */
  constructor(paramName, reason) {
    if (typeof paramName === 'undefined') {
      throw new RequiredParameterException('paramName');
    }
    if (typeof reason === 'undefined') {
      throw new RequiredParameterException('reason');
    }

    super(`The parameter "${paramName}" was invalid. ${reason}`);
  }
}

/**
 * There were multiple items which matched the expression.
 *
 * @extends {Error}
 * @class
 */
export class MultipleItemsMatchException extends Error {
  /**
   * Creates a MultipleItemsMatchException
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
export class NoItemFoundException extends Error {
  /**
   * Creates a NoItemFoundException
   */
  constructor() {
    super('There were no items which matched the expression');
  }
}

export default {
  IndexOutOfBoundsException,
  InvalidParameterException,
  MultipleItemsMatchException,
  NoItemFoundException,
  RequiredParameterException,
};

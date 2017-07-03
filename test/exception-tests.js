const assert = require('assert');
const exceptions = require('../Exceptions');
const RequiredParameterException = exceptions.RequiredParameterException;
const IndexOutOfBoundsException = exceptions.IndexOutOfBoundsException;

describe('RequiredParameterException', () => {
  it('should provide info on the paramter name', () => {
    assert.equal('Parameter param must be specified.', (() => {
      try {
        throw new RequiredParameterException('param');
      } catch (e) {
        return e.message;
      }
    })());
  });

  it('should require a parameter name', () => {
    assert.throws(() => new RequiredParameterException(), Error);
  });
});

describe('IndexOutOfBoundsException', () => {
  it('should indicate the invald index', () => {
    assert.equal('The index 10 is out of bounds.', (() => {
      try {
        throw new IndexOutOfBoundsException(10);
      } catch (e) {
        return e.message;
      }
    })());
  });

  it('should require an index', () => {
    assert.throws(() => new IndexOutOfBoundsException(),
      RequiredParameterException);
  });
});

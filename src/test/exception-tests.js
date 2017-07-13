import assert from 'assert';
import {
  IndexOutOfBoundsException,
  InvalidParameterException,
  MultipleItemsMatchException,
  NoItemFoundException,
  RequiredParameterException,
} from '../Exceptions';

describe('IndexOutOfBoundsException', () => {
  it('should indicate the invald index', () => {
    assert.throws(() => {
      throw new IndexOutOfBoundsException(10);
    },
    e => {
      assert(e instanceof IndexOutOfBoundsException);
      assert.equal('The index 10 is out of bounds.', e.message);
      return true;
    });
  });

  it('should require an index', () => {
    assert.throws(() => new IndexOutOfBoundsException(),
      RequiredParameterException);
  });
});

describe('InvalidParameterException', () => {
  it('should provide info on the paramter name', () => {
    assert.throws(() => {
      throw new InvalidParameterException('param', 'param must be a number');
    },
    e => {
      assert(e instanceof InvalidParameterException);
      assert.equal('The parameter "param" was invalid. param must be a number',
        e.message);
      return true;
    });
  });

  it('should require a parameter name and reason', () => {
    assert.throws(() => new InvalidParameterException(), Error);
    assert.throws(() => new InvalidParameterException('param'), Error);
  });
});

describe('MultipleItemsMatchException', () => {
  it('should have a message', () => {
    assert.throws(() => {
      throw new MultipleItemsMatchException();
    },
    e => {
      assert(e instanceof MultipleItemsMatchException);
      assert.equal('There were multiple items which matched the expression',
        e.message);
      return true;
    });
  });
});

describe('NoItemFoundException', () => {
  it('should have a message', () => {
    assert.throws(() => {
      throw new NoItemFoundException();
    },
    e => {
      assert(e instanceof NoItemFoundException);
      assert.equal('There were no items which matched the expression',
        e.message);
      return true;
    });
  });
});

describe('RequiredParameterException', () => {
  it('should have a message', () => {
    assert.throws(() => {
      throw new RequiredParameterException('param');
    },
    e => {
      assert(e instanceof RequiredParameterException);
      assert.equal('Parameter "param" must be specified.', e.message);
      return true;
    });
  });

  it('should require a parameter name', () => {
    assert.throws(() => new RequiredParameterException(), Error);
  });
});

let assert = require('assert');
let requirejs = require('requirejs');
requirejs.config({
  baseUrl: '.',
  nodeRequire: require,
});

let array = requirejs('Array');
let string = requirejs('String');

describe('Array', function() {
  let intArray = [1, 6, 2, 3, 4, 5];

  describe('#max()', function() {

    it('should return null when the array is empty', function() {
      assert.equal(null, [].max());
      assert.equal(null, array.max([], () => {}));
    });

    it('should return the largest number in an array of numbers',
      function() {
        assert.equal(6, intArray.max());
        assert.equal(6, array.max(intArray));
      });

    it('should return the largest number according to the given lambda',
      function() {
        assert.equal(1, intArray.max((x) => -x));
        assert.equal(4, array.max(intArray, (x) => x % 5));
      });
  });

  describe('#min()', function() {
    it('should return null when the array is empty', function() {
      assert.equal(null, [].min());
      assert.equal(null, array.min([], () => {}));
    });

    it('should return the smallest number in an array of numbers',
      function() {
        assert.equal(1, intArray.min());
        assert.equal(1, array.min(intArray));
      });

    it(
      'should return the smallest number according to the given lambda',
      function() {
        assert.equal(6, intArray.min((x) => -x));
        assert.equal(5, array.min(intArray, (x) => x % 5));
      });
  });
});

describe('String', function() {
  describe('#format()', function() {

    it('should return an empty string if none given', function() {
      assert.equal('', ''.format(1));
      assert.equal('', string.format(''));
      assert.equal('', ''.format(10));
    });

    it('should format strings properly', function() {
      assert.equal('This is cool',
        '{0} {1} cool'.format('This', 'is'));
      assert.equal('100', '{0}0'.format(10));
      assert.equal('foo = bar', '{0}'.format({
        foo: 'bar',
        toString: function() {
          return 'foo = ' + this.foo;
        },
      }));
    });
  });
});

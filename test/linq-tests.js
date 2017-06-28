let assert = require('assert');
let array = require('../Array');
let gen = require('../Generator');
let linq = require('../Linq');

describe('Linq', function() {
  let intArray = [1, 2, 3, 4, 5, 6];

  describe('#max()', function() {
    it('should return null when the array is empty', function() {
      assert.equal(null, [].max());
      assert.equal(null, linq.max([], () => {}));
    });

    it('should return the largest number in an array of numbers',
      function() {
        assert.equal(6, intArray.max());
        assert.equal(6, linq.max(intArray));
      });

    it('should return the largest number according to the given lambda',
      function() {
        assert.equal(1, intArray.max((x) => -x));
        assert.equal(4, linq.max(intArray, (x) => x % 5));
        assert.equal(1, linq.max(intArray, () => false));
      });
  });

  describe('#min()', function() {
    it('should return null when the array is empty', function() {
      assert.equal(null, [].min());
      assert.equal(null, linq.min([], () => {}));
    });

    it('should return the smallest number in an array of numbers',
      function() {
        assert.equal(1, intArray.min());
        assert.equal(1, linq.min(intArray));
      });

    it(
      'should return the smallest number according to the given lambda',
      function() {
        assert.equal(6, intArray.min((x) => -x));
        assert.equal(5, linq.min(intArray, (x) => x % 5));
        assert.equal(1, linq.min(intArray, () => false));
      });
  });

  describe('#where()', function() {
    it(
      'should return a generator that yields the elements filtered by the evaluator',
      function() {
        let arr = [{
          a: true,
          id: 1,
        }, {
          b: true,
          id: 2,
        }, {
          a: true,
          id: 3,
        }];

        assert.deepEqual([{
          a: true,
          id: 1,
        }, {
          a: true,
          id: 3,
        }], array(linq.where(arr, el => el.a)));

        assert.deepEqual([{
          a: true,
          id: 1,
        }, {
          b: true,
          id: 2,
        }], array(linq.where(arr, el => el.id < 3)));

        let numbers = array(gen.range(3, 10));
        assert.deepEqual([5, 6, 7], array(numbers.where(x => x > 4 && x < 8)));
      });
  });
});

let assert = require('assert');
let list = require('../List');
let gen = require('../Generator');
let linq = require('../Linq');

let arrayDeepEqual = (expected, actual) => {
  for (let [i, x] of expected.enumerate()) {
    if (Array.isArray(x)) {
      arrayDeepEqual(x, actual[i]);
    } else {
      assert.deepEqual(x, actual[i]);
    }
  }
};

describe('Linq', function() {
  describe('#max()', function() {
    it('should return null when the array is empty', function() {
      assert.equal(null, [].max());
      assert.equal(null, linq.max([], () => {}));
    });

    it('should return the largest number in an array of numbers',
      function() {
        let intArray = list(gen.range(1, 7));
        assert.equal(6, intArray.max());
        assert.equal(6, linq.max(intArray));
      });

    it('should return the largest number according to the given lambda',
      function() {
        let intArray = list(gen.range(1, 7));
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
        let intArray = list(gen.range(1, 7));
        assert.equal(1, intArray.min());
        assert.equal(1, linq.min(intArray));
      });

    it(
      'should return the smallest number according to the given lambda',
      function() {
        let intArray = list(gen.range(1, 7));
        assert.equal(6, intArray.min((x) => -x));
        assert.equal(5, linq.min(intArray, (x) => x % 5));
        assert.equal(1, linq.min(intArray, () => false));
      });
  });

  describe('#orderBy()', function() {
    it('should return a list of lists sorted by the lambda', function() {
      let intArray = list(gen.range(1, 7));
      arrayDeepEqual([
        [2, 4, 6],
        [1, 3, 5],
      ], intArray.orderBy(x => x % 2));
      arrayDeepEqual([
        [2, 4, 6],
        [1, 3, 5],
      ], linq.orderBy(intArray, x => x % 2));
    });

    it('should work with negative numbers', () => {
      let intArray = list(gen.range(-4, 5));
      arrayDeepEqual([
        [1, 2, 3, 4],
        [-4, -3, -2, -1, 0],
      ], intArray.orderBy(x => x > 0 ? 0 : 1));
    });

    it('should return an empty list when an empty list is given', function() {
      arrayDeepEqual([], [].orderBy(x => x % 2));
      arrayDeepEqual([], linq.orderBy([], x => x % 2));
    });
  });

  describe('#thenBy()', function() {
    it('should return a list of sorted lists using the lambda', function() {
      let intArray = [4, 3, 6, 2, 1, 5];
      arrayDeepEqual([
        [[6], [4], [2]],
        [[5], [3], [1]],
      ], intArray.orderBy(x => x % 2).thenBy(x => -x));
      arrayDeepEqual([
        [[6], [4], [2]],
        [[5], [3], [1]],
      ], linq.thenBy(linq.orderBy(intArray, x => x % 2), x => -x));
    });

    it('should return an empty list when an empty list is given', function() {
      arrayDeepEqual([], [].orderBy(x => x % 2).thenBy());
      arrayDeepEqual([], linq.orderBy([], x => x % 2).thenBy());
    });
  });

  describe('#toList()', function() {
    it('should return a compressed list one level deep', function() {
      let intArray = [4, 3, 6, 2, 1, 5];
      assert.deepEqual([4, 6, 2, 3, 1, 5],
        intArray.orderBy(x => x % 2).toList());
      assert.deepEqual([4, 6, 2, 3, 1, 5],
        linq.toList(linq.orderBy(intArray, x => x % 2)));
    });

    it('should return a compressed list two levels deep', function() {
      let intArray = [4, 3, 6, 2, 1, 5];
      assert.deepEqual([2, 4, 6, 1, 3, 5],
        intArray.orderBy(x => x % 2).thenBy(x => x).toList());
      assert.deepEqual([6, 4, 2, 5, 3, 1],
        linq.toList(linq.thenBy(linq.orderBy(intArray, x => x % 2),
          x => -x)));
    });

    it('should return a compressed list three levels deep', function() {
      let intArray = [42, 39, 44, 21, 17, 58];
      console.log(intArray.orderBy(x => {
        // console.log(x, x % 10);
        return x % 10;
      }));
    });

    it('should return a compressed list without compressing existing arrays',
      function() {
        throw Error('Test Not Implemented');
      });

    it('should return an empty list when an empty list is given', function() {
      assert.deepEqual([], [].orderBy(x => x % 2).thenBy(x => x).toList());
      assert.deepEqual([], linq.toList(linq.orderBy([], x => x % 2).thenBy()));
    });
  });

  describe('#where()', function() {
    it(
      'should return a generator that yields the elements filtered by the evaluator',
      function() {
        let arr = [
          { a: true, id: 1 },
          { b: true, id: 2 },
          { a: true, id: 3 },
        ];

        assert.deepEqual([
          { a: true, id: 1 },
          { a: true, id: 3 },
        ], list(linq.where(arr, el => el.a)));

        assert.deepEqual([
          { a: true, id: 1 },
          { b: true, id: 2 },
        ], list(linq.where(arr, el => el.id < 3)));

        let numbers = list(gen.range(3, 10));
        assert.deepEqual([5, 6, 7], list(numbers.where(x => x > 4 && x < 8)));
      });
  });
});

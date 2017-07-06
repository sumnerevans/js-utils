const assert = require('assert');
const gen = require('../Generator');
const linq = require('../Linq');
const list = require('../List');
const string = require('../String');
const util = require('../Util');

const arrayDeepEqual = (expected, actual) => {
  for (const [i, x] of expected.enumerate()) {
    if (Array.isArray(x)) {
      arrayDeepEqual(x, actual[i]);
    } else {
      assert.deepEqual(x, actual[i]);
    }
  }
};

describe('Linq', () => {
  describe('#all', () => {
    it('should return true if all of the elements of the array match the evaluator',
      () => {
        assert([3, 6, 9, 15].all(x => x % 3 === 0));
        assert([{ a: 3 }, { a: 3 }].all(x => x.a === 3));
      });

    it('should return false if at least one element does not match the evaluator',
      () => {
        assert(![3, 6, 9, 14].all(x => x % 3 === 0));
        assert(![{ a: 3 }, { a: 3 }, { a: 2 }].all(x => x.a === 3));
      });
  });

  describe('#any', () => {
    it('should return true if any of the elements of the array match the evaluator',
      () => {
        assert([2, 4, 5, 15, 16].any(x => x % 3 === 0));
        assert([{ a: 2 }, { a: 3 }, { a: 5 }].any(x => x.a === 3));
      });

    it('should return false if no element matches the evaluator',
      () => {
        assert(![20, 10, 4, 14].any(x => x % 3 === 0));
        assert(![{ a: 2 }, { a: 1 }, { a: 5 }].any(x => x.a === 3));
      });
  });

  describe('#average()', () => {
    it('should return NaN when the array is empty', () => {
      assert(Number.isNaN([].average()));
      assert(Number.isNaN(linq.average([], () => 1)));
    });

    it('should return the average of the numbers in the array', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(3.5, intArray.average());
      assert.equal(3.5, linq.average(intArray));
    });

    it('should return the average according to the given lambda', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(-3.5, intArray.average(x => -x));
      assert.equal(1.83333333333333333333, linq.average(intArray, x => x % 5));
    });
  });

  describe('#elementAt()', () => {
    it('should throw an error when the element is not in bounds', () => {
      const intArray = list(gen.range(1, 7));
      assert.throws(() => intArray.elementAt(-1));
      assert.throws(() => intArray.elementAt(10));
      assert.throws(() => linq.elementAt(intArray, 10));
    });

    it('should throw an error when no param is given', () => {
      assert.throws([].elementAt);
    });

    it('should retrieve the element at the given index', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(2, intArray.elementAt(1));
      assert.equal(2, linq.elementAt(intArray, 1));
      assert.equal(6, intArray.elementAt(5));
      assert.equal(6, linq.elementAt(intArray, 5));
    });

    it('should retrieve the element by reference at the given index', () => {
      const array = [{ a: 1 }, { a: 2 }];
      assert.equal(array[0], array.elementAt(0));
    });
  });

  describe('#elementAtOrDefault()', () => {
    it('should not throw an error when the element is not in bounds', () => {
      const intArray = list(gen.range(1, 7));
      assert.doesNotThrow(() => intArray.elementAtOrDefault(-1, 0));
      assert.doesNotThrow(() => intArray.elementAtOrDefault(10, 0));
      assert.doesNotThrow(() => linq.elementAtOrDefault(intArray, 10, 0));
    });

    it('should throw an error when no param is given', () => {
      assert.throws([].elementAtOrDefault);
    });

    it('should retrieve the element at the given index', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(2, intArray.elementAtOrDefault(1));
      assert.equal(2, linq.elementAtOrDefault(intArray, 1));
      assert.equal(6, intArray.elementAtOrDefault(5));
      assert.equal(6, linq.elementAtOrDefault(intArray, 5));
    });

    it('should retrieve the default if the index is out of bounds', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(0, intArray.elementAtOrDefault(-1, 0));
      assert.equal(0, linq.elementAtOrDefault(intArray, -1, 0));
    });

    it('should default the default to null', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(null, intArray.elementAtOrDefault(-1));
      assert.equal(null, linq.elementAtOrDefault(intArray, -1));
    });

    it('should retrieve the element by reference at the given index', () => {
      const array = [{ a: 1 }, { a: 2 }];
      assert.equal(array[0], array.elementAtOrDefault(0));
    });
  });

  describe('#first()', () => {
    it('should throw an exception when the array is empty', () => {
      assert.throws([].first);
      assert.throws(() => linq.first([], () => 1));
    });

    it('should throw an exception when nothing in the array matches', () => {
      assert.throws(() => [1, 3, 5].first(x => x % 2 === 0));
    });

    it('should return the first element of the array if no lambda is given',
      () => {
        const intArray = list(gen.range(1, 7));
        assert.equal(1, intArray.first());
        assert.equal(1, linq.first(intArray));
      });

    it('should return the first element of the array that matches the lambda',
      () => {
        const intArray = list(gen.range(1, 7));
        assert.equal(3, intArray.first(x => x % 3 === 0));
        assert.deepEqual({ a: 4 },
          linq.first([{ a: 2 }, { a: 4 }, { a: 1 }], x => x.a === 4));
      });
  });

  describe('#firstOrDefault()', () => {
    it('should return the default when the array is empty', () => {
      assert.equal(10, [].firstOrDefault(10));
      assert.equal(10, linq.firstOrDefault([], () => 1, 10));
    });

    it('should return the default when nothing in the array matches', () => {
      assert.equal(10, [1, 3, 5].firstOrDefault(x => x % 2 === 0, 10));
    });

    it('should behave just like #first() when an element matches', () => {
      assert.equal(1, list(gen.range(1, 7)).firstOrDefault());
      assert.deepEqual({ a: 4 },
        linq.firstOrDefault([{ a: 2 }, { a: 4 }, { a: 1 }], x => x.a === 4));
    });

    it('should default the default to null', () => {
      assert.equal(null, [].firstOrDefault());
      assert.equal(null, [3, 1, 9].firstOrDefault(x => x % 2 === 0));
    });
  });

  describe('#last()', () => {
    it('should throw an exception when the array is empty', () => {
      assert.throws([].last);
      assert.throws(() => linq.last([], () => 1));
    });

    it('should throw an exception when nothing in the array matches', () => {
      assert.throws(() => [1, 3, 5].last(x => x % 2 === 0));
    });

    it('should return the last element of the array if no lambda is given',
      () => {
        const intArray = list(gen.range(1, 7));
        assert.equal(6, intArray.last());
        assert.equal(6, linq.last(intArray));
      });

    it('should return the last element of the array that matches the lambda',
      () => {
        const intArray = list(gen.range(1, 7));
        assert.equal(4, intArray.last(x => x % 4 === 0));
        assert.deepEqual({ a: 4 },
          linq.last([{ a: 2 }, { a: 4 }, { a: 1 }], x => x.a === 4));
      });
  });

  describe('#lastOrDefault()', () => {
    it('should return the default when the array is empty', () => {
      assert.equal(10, [].lastOrDefault(10));
      assert.equal(10, linq.lastOrDefault([], () => 1, 10));
    });

    it('should return the default when nothing in the array matches', () => {
      assert.equal(10, [1, 3, 5].lastOrDefault(x => x % 2 === 0, 10));
    });

    it('should behave just like #last() when an element matches', () => {
      assert.equal(6, list(gen.range(1, 7)).lastOrDefault());
      assert.deepEqual({ a: 4 },
        linq.lastOrDefault([{ a: 2 }, { a: 4 }, { a: 1 }], x => x.a === 4));
    });

    it('should default the default to null', () => {
      assert.equal(null, [].lastOrDefault());
      assert.equal(null, [9, 1, 3].lastOrDefault(x => x % 2 === 0));
    });
  });

  describe('#max()', () => {
    it('should return null when the array is empty', () => {
      assert.equal(null, [].max());
      assert.equal(null, linq.max([], util.emptyFn));
    });

    it('should return the largest number in an array of numbers', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(6, intArray.max());
      assert.equal(6, linq.max(intArray));
    });

    it('should return the largest number according to the given lambda', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(1, intArray.max(x => -x));
      assert.equal(4, linq.max(intArray, x => x % 5));
      assert.equal(1, linq.max(intArray, () => false));
    });
  });

  describe('#min()', () => {
    it('should return null when the array is empty', () => {
      assert.equal(null, [].min());
      assert.equal(null, linq.min([], util.emptyFn));
    });

    it('should return the smallest number in an array of numbers', () => {
      const intArray = list(gen.range(1, 7));
      assert.equal(1, intArray.min());
      assert.equal(1, linq.min(intArray));
    });

    it(
      'should return the smallest number according to the given lambda', () => {
        const intArray = list(gen.range(1, 7));
        assert.equal(6, intArray.min(x => -x));
        assert.equal(5, linq.min(intArray, x => x % 5));
        assert.equal(1, linq.min(intArray, () => false));
      });
  });

  describe('#orderBy()', () => {
    it('should return a list of lists sorted by the lambda', () => {
      const intArray = list(gen.range(1, 7));
      arrayDeepEqual([[2, 4, 6], [1, 3, 5]], intArray.orderBy(x => x % 2));
      arrayDeepEqual([[2, 4, 6], [1, 3, 5]],
        linq.orderBy(intArray, x => x % 2));
    });

    it('should work with negative numbers', () => {
      const intArray = list(gen.range(-4, 5));
      arrayDeepEqual([[1, 2, 3, 4], [-4, -3, -2, -1, 0]],
        intArray.orderBy(x => x > 0 ? 0 : 1));
    });

    it('should return an empty list when an empty list is given', () => {
      arrayDeepEqual([], [].orderBy(x => x % 2));
      arrayDeepEqual([], linq.orderBy([], x => x % 2));
    });
  });

  describe('#select()', () => {
    it('should select a single element', () => {
      const stringArray = ['one', 'two', 'three'];
      const objArray = [{ a: 1 }, { a: 2 }, { b: 3 }];
      assert.deepEqual([3, 3, 5], list(stringArray.select(s => s.length)));
      assert.deepEqual([1, 2, null], list(objArray.select(o => o.a || null)));
    });

    it('should work with objects', () => {
      const stringArray = ['one', 'two', 'three'];
      const selected = linq.select(stringArray, s => {
        return {
          length: s.length,
          content: s,
        };
      });
      assert.deepEqual([{
        length: 3,
        content: 'one',
      }, {
        length: 3,
        content: 'two',
      }, {
        length: 5,
        content: 'three',
      }], selected);
    });
  });

  describe('#sequenceEqual()', () => {
    it('should compare the individual elements of the array', () => {
      assert([1, 3, 5].sequenceEqual([1, 3, 5]));
      const objArray = [{ a: 1 }, { a: 2 }, { b: 3 }];
      assert(objArray.sequenceEqual([objArray[0], objArray[1], objArray[2]]));

      assert(![1, 2, 3].sequenceEqual([1, 3]));
      assert(![1, 2, 3].sequenceEqual([1, 3, 2]));
    });

    it('should use the given lambda for comparisons', () => {
      assert(['hello', 'test'].sequenceEqual(['HELLO', 'TEST'],
        string.comparers.ignoreCase));
      assert(!['goodbye', 'test'].sequenceEqual(['HELLO', 'TEST'],
        string.comparers.ignoreCase));
    });
  });

  describe('#single()', () => {
    it('should return the element that matches the lambda', () => {
      assert.equal(4, [3, 4, 9].single(x => x % 2 === 0));
    });

    it('should blow up if no element matches the lambda', () => {
      assert.throws([].single);
      assert.throws(() => linq.single([], () => 1));
      assert.throws(() => [2, 2].single(x => x === 3));
    });

    it('should blow up if multiple items match the lambda', () => {
      assert.throws(() => [3, 4, 2, 1, 6, 5].single(x => x % 2 === 0));
      assert.throws(() => [3, 3].single(x => x === 3));
    });
  });

  describe('#singleOrDefault()', () => {
    it('should behave like #single() if one or more elements match the lambda',
      () => {
        assert.equal(4, [3, 4, 9].singleOrDefault(x => x % 2 === 0));
        assert.throws(() =>
          [3, 4, 2, 1, 6, 5].singleOrDefault(x => x % 2 === 0));
        assert.throws(() => [3, 3].singleOrDefault(x => x === 3));
      });

    it('should return null if no element matches the lambda and no default is specified',
      () => {
        assert.equal(null, [].singleOrDefault());
        assert.equal(null, linq.singleOrDefault([], () => false));
        assert.equal(null, [2, 4, 6].singleOrDefault(x => x % 2 === 1));
      });

    it('should return the default if no element matches the lambda', () => {
      assert.equal(10, [].singleOrDefault(10));
      assert.equal(9, [2, 4, 6].singleOrDefault(x => x % 2 === 1, 9));
    });
  });

  describe('#skip()', () => {
    it('should return everything after the first N elements from the array',
      () => {
        assert.deepEqual(list(gen.range(3, 100)),
          list(list(gen.range(100)).skip(3)));

        const objArray = [{ a: 1 }, { a: 2 }, { b: 3 }, { a: 3 }];
        assert.deepEqual([objArray[2], objArray[3]], list(objArray.skip(2)));
      });
  });

  describe('#skipWhile()', () => {
    it('should return the elements after the first non-match', () => {
      const objArray = [{ a: 1 }, { a: 2 }, { b: 3 }, { a: 3 }];
      assert.deepEqual([objArray[2], objArray[3]],
        list(objArray.skipWhile(x => x.a)));
    });
  });

  describe('#sum()', () => {
    it('should return the sum of the elements if no lambda is specified',
      () => {
        const intArray = list(gen.range(1, 7));
        assert.equal(21, intArray.sum());
        assert.equal(0, linq.sum([-10, 3, 6, -4, 5]));
      });

    it('should return the sum of the elements using the lambda', () => {
      assert.equal(0, list(gen.range(-4, 5)).sum(() => 0));
      assert.equal(120, [2, 4, 10].sum(x => x * x));
      assert.equal(10, [{ a: 3 }, { a: 7 }].sum(x => x.a));
    });
  });

  describe('#take()', () => {
    it('should return the first N elements from the array', () => {
      assert.deepEqual([0, 1, 2], list(list(gen.range(100)).take(3)));

      const objArray = [{ a: 1 }, { a: 2 }, { b: 3 }];
      assert.deepEqual([objArray[0], objArray[1]], list(objArray.take(2)));
    });
  });

  describe('#takeWhile()', () => {
    it('should return the elements until the lambda does not match', () => {
      const objArray = [{ a: 1 }, { a: 2 }, { b: 3 }, { a: 3 }];
      assert.deepEqual([objArray[0], objArray[1]],
        list(objArray.takeWhile(x => x.a)));
    });
  });

  describe('#thenBy()', () => {
    it('should return a list of sorted lists using the lambda', () => {
      const intArray = [4, 3, 6, 2, 1, 5];
      arrayDeepEqual([[[6], [4], [2]], [[5], [3], [1]]],
        intArray.orderBy(x => x % 2).thenBy(x => -x));
      arrayDeepEqual([[[6], [4], [2]], [[5], [3], [1]]],
        linq.thenBy(linq.orderBy(intArray, x => x % 2), x => -x));
    });

    it('should return an empty list when an empty list is given', () => {
      arrayDeepEqual([], [].orderBy(x => x % 2).thenBy());
      arrayDeepEqual([], linq.orderBy([], x => x % 2).thenBy());
    });
  });

  describe('#toList()', () => {
    it('should return a compressed list one level deep', () => {
      const intArray = [4, 3, 6, 2, 1, 5];
      assert.deepEqual([4, 6, 2, 3, 1, 5],
        intArray.orderBy(x => x % 2).toList());
      assert.deepEqual([4, 6, 2, 3, 1, 5],
        linq.toList(linq.orderBy(intArray, x => x % 2)));
    });

    it('should return a compressed list two levels deep', () => {
      const intArray = [4, 3, 6, 2, 1, 5];
      assert.deepEqual([2, 4, 6, 1, 3, 5],
        intArray.orderBy(x => x % 2).thenBy(x => x).toList());
      assert.deepEqual([6, 4, 2, 5, 3, 1],
        linq.toList(linq.thenBy(linq.orderBy(intArray, x => x % 2),
          x => -x)));
    });

    it('should return a compressed list three levels deep', () => {
      const intArray = [42, 39, 11, 44, 21, 17, 58, 47, 27];
      assert.deepEqual([21, 11, 42, 44, 17, 27, 47, 58, 39],
        intArray.orderBy(x => x % 10)
          .thenBy(x => x / 10)
          .thenBy(x => x % 10 === 1 ? x % 21 : x)
          .toList());
    });

    it('should return a compressed list without compressing existing arrays',
      () => {
        const intArray = [42, 39, 11, 44, 21, 17, 58, 47, 27];
        const arrayOfArrays = intArray.orderBy(x => x % 10);
        assert.deepEqual([[58], [44], [42], [39], [17, 47, 27], [11, 21]],
          arrayOfArrays.orderBy(x => -x[0]).toList());
      });

    it('should return an empty list when an empty list is given', () => {
      assert.deepEqual([], [].orderBy(x => x % 2).thenBy(x => x).toList());
      assert.deepEqual([], linq.toList(linq.orderBy([], x => x % 2).thenBy()));
    });
  });

  describe('#where()', () => {
    it(
      'should return a list of the elements filtered by the evaluator',
      () => {
        const arr = [
          { a: true, id: 1 },
          { b: true, id: 2 },
          { a: true, id: 3 },
        ];

        assert.deepEqual([{ a: true, id: 1 }, { a: true, id: 3 }],
          linq.where(arr, el => el.a));

        assert.deepEqual([{ a: true, id: 1 }, { b: true, id: 2 }],
          linq.where(arr, el => el.id < 3));

        const numbers = list(gen.range(3, 10));
        assert.deepEqual([5, 6, 7], numbers.where(x => x > 4 && x < 8));
      });
  });
});

let assert = require('assert');
let requirejs = require('requirejs');
requirejs.config({
  baseUrl: '.',
  nodeRequire: require,
});

let array = requirejs('Array');
requirejs('String');

describe('Array', function() {
  it('should convert an iterator to an array', function() {
    let generator = function*() {
      yield 1;
      yield 2;
      yield 3;
      return;
    }
    assert.deepEqual([1, 2, 3], array(generator()));
    assert.deepEqual(['t', 'e', 's', 't'], array('test'))
  });

  let intArray = [1, 2, 3, 4, 5, 6];

  describe('#enumerate()', function() {
    it('should return work in for loops', function() {
      let index = 0;
      for (let [i, el] of intArray.enumerate()) {
        assert.equal(i, index);
        assert.equal(el, intArray[i]);
        index++;
      }

      index = 0;
      for (let [i, el] of array.enumerate(intArray)) {
        assert.equal(i, index);
        assert.equal(el, intArray[i]);
        index++;
      }
    });

    it('should return work as a generator function', function() {
      let index = 0;
      let gen = intArray.enumerate();
      let next = gen.next();
      while (!next.done) {
        assert.equal(next.value[0], index);
        assert.equal(next.value[1], intArray[index]);
        index++;
        next = gen.next();
      }
    });
  });

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
        assert.equal(1, array.max(intArray, () => false));
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
        assert.equal(1, array.min(intArray, () => false));
      });
  });

  describe('#range()', function() {
    it('should generate a range between [0, start)', function() {
      assert.deepEqual([0, 1, 2, 3, 4], array(array.range(5)));
      assert.deepEqual([], array(array.range(0)));
    });

    it('should generate a range between [start, stop)', function() {
      assert.deepEqual([1, 2, 3, 4], array(array.range(1, 5)));
      assert.deepEqual([3, 4, 5, 6], array(array.range(3, 7)));
    });

    it('should generate a range between [start, stop) with the step',
      function() {
        assert.deepEqual([1, 3, 5], array(array.range(1, 6, 2)));
        assert.deepEqual([3, 6, 9], array(array.range(3, 10, 3)));
      });
  });

  describe('#remove()', function() {
    it('should remove a single item', function() {
      let arr = [1, 2, 3, 4, 5];
      array.remove(arr, 2)
      assert.deepEqual([1, 2, 4, 5], arr);

      arr = [1, 2, 3, 4, 5];
      arr.remove(3);
      assert.deepEqual([1, 2, 3, 5], arr);

      arr = [1, 2, 3, 4, 5];
      assert.deepEqual([1, 2, 3, 5], arr.remove(3));
    });

    it('should remove a range of items', function() {
      let arr = [1, 2, 3, 4, 5];
      array.remove(arr, 0, 2)
      assert.deepEqual([4, 5], arr);

      arr = [1, 2, 3, 4, 5];
      arr.remove(1, 3);
      assert.deepEqual([1, 5], arr);

      arr = [1, 2, 3, 4, 5];
      assert.deepEqual([1, 5], arr.remove(1, 3));
    });
  });

  describe('#sortBy()', function() {
    it('should return a sorted array according to the given lambda',
      function() {
        assert.deepEqual([1, 2, 3], [3, 1, 2].sortBy(x => x));
        assert.deepEqual([1, 2, 3], array.sortBy([3, 1, 2], x => x));
        assert.deepEqual(['a', 'b', 'c'], ['c', 'a', 'b'].sortBy(x => x.ord()));
        assert.deepEqual([{
          a: 2
        }, {
          a: 3
        }, {
          a: 10
        }], [{
          'a': 10
        }, {
          a: 2
        }, {
          a: 3
        }].sortBy(x => x.a));
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
        }], array(array.where(arr, el => el.a)));

        assert.deepEqual([{
          a: true,
          id: 1,
        }, {
          b: true,
          id: 2,
        }], array(array.where(arr, el => el.id < 3)));

        let numbers = array(array.range(3, 10));
        assert.deepEqual([5, 6, 7], array(numbers.where(x => x > 4 && x < 8)));
      });
  });
});

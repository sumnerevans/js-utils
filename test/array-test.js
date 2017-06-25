let assert = require('assert');
let requirejs = require('requirejs');
requirejs.config({
  baseUrl: '.',
  nodeRequire: require,
});

let array = requirejs('Array');
requirejs('String');

describe('Array', function() {
  let intArray = [1, 6, 2, 3, 4, 5];

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

  describe('#sortBy()', function() {
    it('should return a sorted array according to the given lambda',
      function() {
        assert.deepEqual([1, 2, 3], [3, 1, 2].sortBy(x => x));
        assert.deepEqual([1, 2, 3], array.sortBy([3, 1, 2], x => x));
        assert.deepEqual(['a', 'b', 'c'], ['c', 'a', 'b'].sortBy(x =>
          x.ord()));
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
});

let assert = require('assert');
let array = require('../Array');
require('../String');

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
});

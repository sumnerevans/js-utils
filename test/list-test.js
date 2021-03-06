const assert = require('assert');
const list = require('../List');
require('../String');

describe('List', () => {
  it('should convert an iterator to an array', () => {
    const generator = function*() {
      yield 1;
      yield 2;
      yield 3;
    };
    assert.deepEqual([1, 2, 3], list(generator()));
    assert.deepEqual(['t', 'e', 's', 't'], list('test'));
    assert.deepEqual([], list());
  });

  describe('#enumerate()', () => {
    it('should work in for loops', () => {
      const intArray = [1, 2, 3, 4, 5, 6];
      let index = 0;
      for (const [i, el] of intArray.enumerate()) {
        assert.equal(i, index);
        assert.equal(el, intArray[i]);
        index++;
      }

      index = 0;
      for (const [i, el] of list.enumerate(intArray)) {
        assert.equal(i, index);
        assert.equal(el, intArray[i]);
        index++;
      }
    });

    it('should work as a generator function', () => {
      const intArray = [1, 2, 3, 4, 5, 6];
      let index = 0;
      const gen = intArray.enumerate();
      let next = gen.next();
      while (!next.done) {
        assert.equal(next.value[0], index);
        assert.equal(next.value[1], intArray[index]);
        index++;
        next = gen.next();
      }
    });
  });

  describe('#remove()', () => {
    it('should remove a single item', () => {
      let arr = [1, 2, 3, 4, 5];
      list.remove(arr, 2);
      assert.deepEqual([1, 2, 4, 5], arr);

      arr = [1, 2, 3, 4, 5];
      arr.remove(3);
      assert.deepEqual([1, 2, 3, 5], arr);

      arr = [1, 2, 3, 4, 5];
      assert.deepEqual([1, 2, 3, 5], arr.remove(3));
    });

    it('should remove a range of items', () => {
      let arr = [1, 2, 3, 4, 5];
      list.remove(arr, 0, 2);
      assert.deepEqual([4, 5], arr);

      arr = [1, 2, 3, 4, 5];
      arr.remove(1, 3);
      assert.deepEqual([1, 5], arr);

      arr = [1, 2, 3, 4, 5];
      assert.deepEqual([1, 5], arr.remove(1, 3));
    });
  });

  describe('#reversed()', () => {
    it('should work in for loops', () => {
      const intArray = [1, 2, 3, 4, 5, 6];
      const reversed = [6, 5, 4, 3, 2, 1];
      let index = 0;
      for (const el of intArray.reversed()) {
        assert.equal(reversed[index], el);
        index++;
      }

      index = 0;
      for (const [i, el] of list.enumerate(intArray)) {
        assert.equal(i, index);
        assert.equal(el, intArray[i]);
        index++;
      }
    });

    it('should work as a generator function', () => {
      const intArray = [1, 2, 3, 4, 5, 6];
      let index = 0;
      const gen = intArray.enumerate();
      let next = gen.next();
      while (!next.done) {
        assert.equal(next.value[0], index);
        assert.equal(next.value[1], intArray[index]);
        index++;
        next = gen.next();
      }
    });
  });

  describe('#sortBy()', () => {
    it('should return a sorted array according to the given lambda', () => {
      assert.deepEqual([1, 2, 3], [3, 1, 2].sortBy(x => x));
      assert.deepEqual([1, 2, 3], list.sortBy([3, 1, 2], x => x));
      assert.deepEqual(['a', 'b', 'c'], ['c', 'a', 'b'].sortBy(x => x.ord()));
      assert.deepEqual([{ a: 2 }, { a: 3 }, { a: 10 }],
        [{ a: 10 }, { a: 2 }, { a: 3 }].sortBy(x => x.a));
    });
  });
});

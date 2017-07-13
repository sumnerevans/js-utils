const assert = require('assert');
const gen = require('../Generator');
const list = require('../List');

describe('Generator', () => {
  describe('#range()', () => {
    it('should generate a range between [0, start)', () => {
      assert.deepEqual([0, 1, 2, 3, 4], list(gen.range(5)));
      assert.deepEqual([], list(gen.range(0)));
    });

    it('should generate a range between [start, stop)', () => {
      assert.deepEqual([1, 2, 3, 4], list(gen.range(1, 5)));
      assert.deepEqual([3, 4, 5, 6], list(gen.range(3, 7)));
      assert.deepEqual([-3, -2, -1, 0, 1], list(gen.range(-3, 2)));
    });

    it('should generate a range between [start, stop) with the step',
      () => {
        assert.deepEqual([1, 3, 5], list(gen.range(1, 6, 2)));
        assert.deepEqual([3, 6, 9], list(gen.range(3, 10, 3)));
        assert.deepEqual([-3, -1, 1], list(gen.range(-3, 2, 2)));
      });
  });
});

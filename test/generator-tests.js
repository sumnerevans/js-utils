let assert = require('assert');
let gen = require('../Generator');
let array = require('../Array');

describe('Generator', function() {
  describe('#range()', function() {
    it('should generate a range between [0, start)', function() {
      assert.deepEqual([0, 1, 2, 3, 4], array(gen.range(5)));
      assert.deepEqual([], array(gen.range(0)));
    });

    it('should generate a range between [start, stop)', function() {
      assert.deepEqual([1, 2, 3, 4], array(gen.range(1, 5)));
      assert.deepEqual([3, 4, 5, 6], array(gen.range(3, 7)));
    });

    it('should generate a range between [start, stop) with the step',
      function() {
        assert.deepEqual([1, 3, 5], array(gen.range(1, 6, 2)));
        assert.deepEqual([3, 6, 9], array(gen.range(3, 10, 3)));
      });
  });
});

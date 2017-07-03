const assert = require('assert');
const string = require('../String');

describe('String', () => {
  describe('comparers', () => {
    describe('#ignoreCase()', () => {
      it('should return false when the strings don\'t match (case insensitive)',
        () => {
          assert(string.comparers.ignoreCase('HELLO', 'hello'));
          assert(string.comparers.ignoreCase('thI$ |s ζ0oι', 'THI$ |S ζ0Oι'));
        });

      it('should return false when the strings do not match (case insensitive)',
        () => {
          assert(!string.comparers.ignoreCase('HELLO', 'HELLO!'));
          assert(!string.comparers.ignoreCase('1234', '₁₂₃â'));
        });
    });
  });

  describe('#format()', () => {
    it('should return an empty string if none given', () => {
      assert.equal('', ''.format(1));
      assert.equal('', string.format(''));
      assert.equal('', ''.format(10));
    });

    it('should format strings properly', () => {
      assert.equal('This is cool',
        '{0} {1} cool'.format('This', 'is'));
      assert.equal('100', '{0}0'.format(10));
      assert.equal('foo = bar', '{0}'.format({
        foo: 'bar',
        toString: function() {
          return `foo = ${this.foo}`;
        },
      }));
    });
  });

  describe('#join', () => {
    it('should return an empty string if the array is empty', () => {
      assert.deepEqual('', 'test'.join([]));
      assert.deepEqual('', string.join([], 'test'));
    });

    it('should return a joined string', () => {
      assert.deepEqual('1, 2, 3', ', '.join([1, 2, 3]));
      assert.deepEqual('1, 2, 3', string.join([1, 2, 3], ', '));
    });
  });

  describe('#ord()', () => {
    it('should return the ordinal value of the given char', () => {
      assert.equal(10, '\n'.ord());
      assert.equal(97, string.ord('a'));
      assert.equal(99, string.ord('c'));
    });

    it('blow up if a single char is not given', () => {
      assert.throws('string'.ord,
        'String.ord expected a string of length 1.');
      assert.throws(''.ord,
        'String.ord expected a string of length 1.');
    });
  });
});

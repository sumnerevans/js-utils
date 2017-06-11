let assert = require('assert');
let requirejs = require('requirejs');
requirejs.config({
  baseUrl: '.',
  nodeRequire: require,
});

let string = requirejs('String');

describe('String', function() {
  describe('#format()', function() {

    it('should return an empty string if none given', function() {
      assert.equal('', ''.format(1));
      assert.equal('', string.format(''));
      assert.equal('', ''.format(10));
    });

    it('should format strings properly', function() {
      assert.equal('This is cool',
        '{0} {1} cool'.format('This', 'is'));
      assert.equal('100', '{0}0'.format(10));
      assert.equal('foo = bar', '{0}'.format({
        foo: 'bar',
        toString: function() {
          return 'foo = ' + this.foo;
        },
      }));
    });
  });

  describe('#ord()', function() {

    it('should return the ordinal value of the given char', function() {
      assert.equal(10, '\n'.ord());
      assert.equal(97, string.ord('a'));
      assert.equal(99, string.ord('c'));
    });

    it('blow up if a single char is not given', function() {
      assert.throws('string'.ord,
        'String.ord expected a string of length 1.');
      assert.throws(''.ord,
        'String.ord expected a string of length 1.');
    });
  });
});

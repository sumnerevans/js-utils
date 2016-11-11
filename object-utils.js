/*
 * Object.prototype.each: a lightweight alternative to jQuery.each
 *
 * Usage: obj.each(fn[, scope]);
 *
 * Parameters: fn    - the function to run on each item in the object
 *                   - Type: function(Object val, String key, Object full_obj)
 *
 *             scope - the context to run the function with
 *                   - Type: object
 *
 * Note: If you return false from fn, iteration will stop.
 *
 * Example:
 *
 *   var obj = {
 *       foo: 'bar',
 *       baz: 1,
 *   };
 *
 *   obj.each(function(key, val) {
 *       console.log('{0}: {1}'.format(key, val));
 *   });
 *
 * Output:
 *
 *   foo: bar
 *   baz: 1
 *
 */
Object.prototype.each = function(fn, scope) {
    for (var index in this) {
        if (this.hasOwnProperty(index)) {
            if (fn.apply(scope, [index, this[index], this]) === false) {
                // stop iterating if the function returns false
                break;
            }
        }
    }
};

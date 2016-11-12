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
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            if (fn.apply(scope, [key, this[key], this]) === false) {
                // stop iterating if the function returns false
                break;
            }
        }
    }
};

Object.prototype.clone = function() {
    var clone = {};
    this.each(function(key, val) {
        clone[key] = val;
    });
    return clone;
};

/*
 * Object.prototype.equals: checks two objects and compares their keys for equality recursively
 *
 * Usage: obj.equals(otherObj);
 *
 * Parameters: rhs - the object to compare
 *
 * Example:
 *
 *     var obj = {
 *         a: 3,
 *         b: {
 *             c: 4
 *         }
 *     };
 *
 *     obj.equals({ a: 3, b: { c: 4 } }); // true
 *
 *     // you can overload the equals function
 *     obj.b.equals = function() { return false; }
 *     obj.equals({ a: 3, b: { c: 4 } }); // false
 *
 */
Object.prototype.equals = function(rhs) {
    if (typeof rhs !== typeof this) {
        return false;
    }

    var checked = [],
        isEqual = true;

    this.each(function(key) {
        checked.push(key);

        if (rhs[key] === null || (this[key] !== rhs[key] && !this[key].equals(rhs[key]))) {
            isEqual = false;
            return false; // exit iteration
        }
    }, this);

    if (!isEqual) {
         return false;
    }

    rhs.each(function(key) {
        if (checked.contains(key)) {
             return; // go to the next item in the object
        }

        // If we got here, then the rhs contains a key that is not in this.
        isEqual = false;
        return false;
    }, this);

    return isEqual;
};

/*
 * Array.prototype.removeAt: removes the item at the given index in the array.
 *
 * Usage: arr.removeAt(index);
 *
 * Example:
 *
 *     var arr = [1, 2, 3, 4, 5];
 *     arr.removeAt(1);
 *     // arr = [1, 3, 4, 5];
 *
 */
Array.prototype.removeAt = function(index) {
    this.splice(index, 1);
};

/*
 * Array.prototype.remove: removes the given item from the array.
 *
 * Usage: arr.remove(item);
 *
 * Example:
 *
 *     var arr = [1, 2, 3, 4, 5];
 *     arr.remove(1);
 *     // arr = [2, 3, 4, 5];
 *
 */
Array.prototype.remove = function(item) {
    for (var i = 0; i < this.length; i++) {
        if (item === this[i]) {
            this.removeAt(i);
            break;
        }
    }
};

/*
 * Array.prototype.contains: checks if the given item is in the array.
 *
 * Usage: arr.contains(item);
 *
 * Example:
 *
 *     var arr = [1, 2, 3, 4, 5];
 *     arr.contains(3); // true
 *     arr.contains(6); // false
 */
Array.prototype.contains = function(item) {
     return this.indexOf(item) >= 0;
};


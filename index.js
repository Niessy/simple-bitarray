/**
 * Expose BitArray
 */
module.exports = BitArray;


/**
 * Creates of bitarray of size n
 *
 * @param {Integer} n   the size of the bitarray
 *
 */
function BitArray(n) {
  var elems = Math.ceil(n / 8);
  var arr = new Uint8Array(elems);
  this.array = arr;
  this.length = n;
  this.extraBits = arr.length * 8 - n;
  return this;
}

/**
 * Sets the value to 1 at the ith bit
 * The input can be a variable number of arguments
 * of either integers or arrays of integers, the integer
 * is the index of the bit to set.
 *
 * @param {Int | Array} arg
 *
 */
BitArray.prototype.set = function(arg) {
  var _s = _set.bind(this);
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'number') {
      _s(arguments[i]);
    } else if (typeof arguments[i] === 'object') {
      for (var j = 0; j < arguments[i].length; j++) {
        _s(arguments[i][j]);
      }
    }
  }
}

/**
 * Gets the value {0,1} at the ith bit
 *
 * @param {Int}   i
 * @return {Int}  0 or 1
 *
 */
BitArray.prototype.get = function() {
  var result = [];
  var _g = _get.bind(this);
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'number') {
      result.push(_g(arguments[i]));
    } else if (typeof arguments[i] === 'object') {
      for (var j = 0; j < arguments[i].length; j++) {
        result.push(_g(arguments[i][j]));
      }
    }
  }
  return result;
}

/**
 * String representation of bits
 *
 * @return {String}
 *
 */
BitArray.prototype.toString = function() {
  var str = '';
  for (var i = 0; i < this.length; i++)  {
    var bit = String(this.get(i));
    str = str.concat(bit);
  }
  return str;
}

/**
 * @api private
 */
function _set(i) {
  var bit = i % 8;
  var byte = Math.floor(i/8);
  var val = this.array.get(byte);
  this.array.set(byte, val | 1<<bit);
}

/**
 * @api private
 */
function _get(i) {
  var bit = i % 8;
  var byte = Math.floor(i/8);
  var val = this.array.get(byte);
  // It's unset
  if (val === (val | 1<<bit)) {
    return 1;
  } else {
    return 0;
  }
}

/**
 * Expose `BitArray`
 */

module.exports = function(n) {
  return new BitArray(n);
};


/**
 * Creates of bitarray of size n
 *
 * @param {Int} n   the size of the bitarray
 *
 */

function BitArray(n) {
  var elems = Math.ceil(n / 8);
  var arr = new Uint8Array(elems);
  this.array = arr;
  this.length = n;
  this.extraBits = arr.length * 8 - n;
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
  var obj = {};
  var _g = _get.bind(this);
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'number') {
      obj[arguments[i]] = _g(arguments[i]);
    } else if (typeof arguments[i] === 'object') {
      for (var j = 0; j < arguments[i].length; j++) {
        obj[arguments[i][j]] = _g(arguments[i][j]);
      }
    }
  }
  return obj;
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
    var obj = this.get(i);
    if (i % 8 == 0 && i !== 0) str += ' '
    str += String(obj[i]);
  }
  return str;
}

/**
 * @api private
 */

function _set(i) {
  var bit = i % 8;
  var byte = Math.floor(i/8);
  var val = this.array[byte];
  var temp = new Uint8Array(1);
  temp[0] = val | 1<<bit;
  this.array.set(temp, byte)
}

/**
 * @api private
 * @return {Int}
 */

function _get(i) {
  var bit = i % 8;
  var byte = Math.floor(i/8);
  var val = this.array[byte];
  // It's unset
  if (val === (val | 1<<bit)) {
    return 1;
  } else {
    return 0;
  }
}

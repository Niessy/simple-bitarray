var assert = require('assert');
var bitarray = require('../index.js');

describe('BitArray.set()', function() {
  it('should turn on the last 2 bits: ARRAY argument', function() {
    var arr = bitarray(10);
    console.log(arr);
    arr.set([8, 9]);
    arr.array[1].should.equal(3);
  })

  it('should turn on the first 3 bits: VARIABLE numbers argument', function() {
    var arr = bitarray(10);
    arr.set(0,1,2);
    arr.array[0].should.equal(7);
  })
})

describe('BitArray.get()', function() {
  var arr = bitarray(10);
  it('should return {0: 1, 1: 1, 2: 1, 5: 0}', function() {
    arr.set(0,1,2);
    arr.get(0,1,2,5).should.eql({
      0: 1,
      1: 1,
      2: 1,
      5: 0
    });
  })

  it('should return {0: 1, 1: 1, 2: 1, 5: 1}', function() {
    arr.set(5);
    arr.get(0,1,2,5).should.eql({
      0: 1,
      1: 1,
      2: 1,
      5: 1
    });
  })

  it('should return {7: 0, 9: 0}', function() {
    arr.get(7, 9).should.eql({
      7: 0,
      9: 0,
    });
  })
  
})

describe('BitArray.toString()', function() {
  it('should print out 00000000 00', function() {
    var arr = bitarray(10);
    arr.toString().should.equal('00000000 00');
  })

  it('should print out 10001000 01', function() {
    var arr = bitarray(10);
    arr.set(9,4,0);
    arr.toString().should.equal('10001000 01');
  })

  it('should print out 00000001 00', function() {
    var arr = bitarray(10);
    arr.set(7);
    arr.toString().should.equal('00000001 00');
  })
})

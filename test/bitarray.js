var assert = require('assert');
var bitarray = require('../index.js');

describe('BitArray.set()', function() {
  it('should turn on the last 2 bits: ARRAY argument', function() {
    var arr = new bitarray(10);
    arr.set([8, 9]);
    arr.array.buffer[1].should.equal(3);
  })

  it('should turn on the first 3 bits: VARIABLE numbers argument', function() {
    var arr = new bitarray(10);
    arr.set(0,1,2);
    arr.array.buffer[0].should.equal(7);
  })
})

describe('BitArray.get()', function() {
  var arr = new bitarray(10);
  it('should return [1,1,1,0]', function() {
    arr.set(0,1,2);
    arr.get(0,1,2,5).should.eql([1,1,1,0]);
  })

  it('should return [1,1,1,1]', function() {
    arr.set(5);
    arr.get(0,1,2,5).should.eql([1,1,1,1]);
    arr.get(7, 9).should.eql([0,0]);
  })

  it('should return [0,0]', function() {
    arr.get(7, 9).should.eql([0,0]);
  })
  
})

describe('BitArray.toString()', function() {
  it('should print out 0000000000', function() {
    var arr = new bitarray(10);
    arr.toString().should.equal('0000000000');
  })

  it('should print out 1000100001', function() {
    var arr = new bitarray(10);
    arr.set(9,4,0);
    arr.toString().should.equal('1000100001');
  })

  it('should print out 0000000100', function() {
    var arr = new bitarray(10);
    arr.set(7);
    arr.toString().should.equal('0000000100');
  })
})

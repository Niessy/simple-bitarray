BitArray
========

## Installation

A very simple bitarray implementation, it uses Uint8Array under the hood, so
at worst you'll have 7 extra bits.

```
$ npm install bitarray
```

## Usage

```js
var bitarray = require('simple-bitarray');
// Makes a bitarray of length 10
var arr = bitarray(10);
 // Set the 0th 2nd and 3rd bit
 // Indexing starts at 0
 arr.set(0, 2, 3);
 arr.get(2); // 1
 arr.get(5) // 0
 arr.toString() // 1011000000
```

## Tests

```
$ npm test
```


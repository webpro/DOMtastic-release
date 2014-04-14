"use strict";
var __moduleName = "util";
var global = new Function("return this")(),
    slice = Array.prototype.slice;
function toArray(collection) {
  return slice.call(collection);
}
function makeIterable(element) {
  return element.length === undefined || element === window ? [element] : element;
}
function each(collection, callback) {
  var length = collection.length;
  if (length !== undefined) {
    for (var i = 0; i < length; i++) {
      callback(collection[i], i, collection);
    }
  } else {
    callback(collection, 0);
  }
  return collection;
}
function extend(target, source) {
  slice.call(arguments, 1).forEach(function(src) {
    if (src) {
      for (var prop in src) {
        target[prop] = src[prop];
      }
    }
  });
  return target;
}
;
module.exports = {
  get global() {
    return global;
  },
  get toArray() {
    return toArray;
  },
  get makeIterable() {
    return makeIterable;
  },
  get each() {
    return each;
  },
  get extend() {
    return extend;
  },
  __esModule: true
};

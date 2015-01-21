"use strict";

var global = new Function("return this")();

function toArray(collection) {
  var length = collection.length, result = new Array(length);
  for (var i = 0; i < length; i++) {
    result[i] = collection[i];
  }
  return result;
}

function each(collection, callback, thisArg) {
  var length = collection.length;
  if (length !== undefined && collection.nodeType === undefined) {
    for (var i = 0; i < length; i++) {
      callback.call(thisArg, collection[i], i, collection);
    }
  } else {
    callback.call(thisArg, collection, 0, collection);
  }
  return collection;
}

function extend(target) {
  var sources = [];

  for (var _key = 1; _key < arguments.length; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (src) {
    for (var prop in src) {
      target[prop] = src[prop];
    }
  });
  return target;
}

function uniq(collection) {
  return collection.filter(function (item, index) {
    return collection.indexOf(item) === index;
  });
}

exports.global = global;
exports.toArray = toArray;
exports.each = each;
exports.extend = extend;
exports.uniq = uniq;
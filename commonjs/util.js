/*
 * @module Util
 */

/*
 * Reference to the global scope
 * @private
 */

"use strict";

var _slice = Array.prototype.slice;
var global = new Function("return this")();

/**
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 * @private
 */

function toArray(collection) {
  var length = collection.length, result = new Array(length);
  for (var i = 0; i < length; i++) {
    result[i] = collection[i];
  }
  return result;
}

/**
 * Return something that can be iterated over (e.g. using `forEach`).
 * Arrays and NodeLists are returned as-is, but a Node will be wrapped in a `[]`.
 *
 * @param {Node|NodeList|Array} element
 * @return {Array|NodeList}
 * @private
 */

var makeIterable = function (element) {
  return element.nodeType || element === window ? [element] : element;
};

/**
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @return {Node|NodeList|Array}
 * @private
 */

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

/**
 * Assign enumerable properties from source object(s) to target object
 *
 * @method extend
 * @param {Object} target Object to extend
 * @param {Object} [source] Object to extend from
 * @return {Object} Extended object
 * @example
 *     $.extend({a: 1}, {b: 2});
 *     ➤ {a: 1, b: 2}
 * @example
 *     $.extend({a: 1}, {b: 2}, {a: 3});
 *     ➤ {a: 3, b: 2}
 */

function extend(target) {
  var sources = _slice.call(arguments, 1);

  sources.forEach(function (src) {
    if (src) {
      for (var prop in src) {
        target[prop] = src[prop];
      }
    }
  });
  return target;
}

exports.global = global;
exports.toArray = toArray;
exports.makeIterable = makeIterable;
exports.each = each;
exports.extend = extend;
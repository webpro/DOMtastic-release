"use strict";
var __moduleName = "array";
var _each = require('./util').each;
var $__0 = require('./selector'),
    $ = $__0.$,
    matches = $__0.matches;
var ArrayProto = Array.prototype;
var every = ArrayProto.every;
function filter(selector, thisArg) {
  var callback = typeof selector === 'function' ? selector : function(element) {
    return matches(element, selector);
  };
  return $(ArrayProto.filter.call(this, callback, thisArg));
}
function forEach(callback, thisArg) {
  return _each(this, callback, thisArg);
}
var each = forEach;
var indexOf = ArrayProto.indexOf;
var map = ArrayProto.map;
var pop = ArrayProto.pop;
var push = ArrayProto.push;
function reverse() {
  var elements = ArrayProto.slice.call(this);
  return $(ArrayProto.reverse.call(elements));
}
var shift = ArrayProto.shift;
var some = ArrayProto.some;
var unshift = ArrayProto.unshift;
;
module.exports = {
  get each() {
    return each;
  },
  get every() {
    return every;
  },
  get filter() {
    return filter;
  },
  get forEach() {
    return forEach;
  },
  get indexOf() {
    return indexOf;
  },
  get map() {
    return map;
  },
  get pop() {
    return pop;
  },
  get push() {
    return push;
  },
  get reverse() {
    return reverse;
  },
  get shift() {
    return shift;
  },
  get some() {
    return some;
  },
  get unshift() {
    return unshift;
  },
  __esModule: true
};

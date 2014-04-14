"use strict";
var __moduleName = "array";
var _each = require('./util').each;
var $__0 = require('./selector'),
    $ = $__0.$,
    matches = $__0.matches;
var ArrayProto = Array.prototype;
function filter(selector) {
  var callback = typeof selector === 'function' ? selector : function(element) {
    return matches(element, selector);
  };
  return $(ArrayProto.filter.call(this, callback));
}
function each(callback) {
  return _each(this, callback);
}
var forEach = each;
var map = ArrayProto.map;
function reverse() {
  var elements = ArrayProto.slice.call(this);
  return $(ArrayProto.reverse.call(elements));
}
var every = ArrayProto.every;
var some = ArrayProto.some;
var indexOf = ArrayProto.indexOf;
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
  get reverse() {
    return reverse;
  },
  get some() {
    return some;
  },
  __esModule: true
};

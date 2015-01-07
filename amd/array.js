define(["exports", "./util", "./selector"], function (exports, _util, _selector) {
  "use strict";

  var _each = _util.each;
  var toArray = _util.toArray;
  var $ = _selector.$;
  var matches = _selector.matches;


  var ArrayProto = Array.prototype;

  var every = ArrayProto.every;

  function filter(selector, thisArg) {
    var callback = typeof selector === "function" ? selector : function (element) {
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

  var reduce = ArrayProto.reduce;

  var reduceRight = ArrayProto.reduceRight;

  function reverse() {
    return $(toArray(this).reverse());
  }

  var shift = ArrayProto.shift;

  var some = ArrayProto.some;

  var unshift = ArrayProto.unshift;

  exports.each = each;
  exports.every = every;
  exports.filter = filter;
  exports.forEach = forEach;
  exports.indexOf = indexOf;
  exports.map = map;
  exports.pop = pop;
  exports.push = push;
  exports.reduce = reduce;
  exports.reduceRight = reduceRight;
  exports.reverse = reverse;
  exports.shift = shift;
  exports.some = some;
  exports.unshift = unshift;
});
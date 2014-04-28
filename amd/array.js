define(['./util', './selector'], function($__0,$__1) {
  "use strict";
  var __moduleName = "array";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var _each = ($__0).each;
  var $__2 = $__1,
      $ = $__2.$,
      matches = $__2.matches;
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
  return {
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
});

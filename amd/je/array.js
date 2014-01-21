define(
  ["./util","./selector","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    // # Array

    var _each = __dependency1__.each;
    var $ = __dependency2__.$;
    var matches = __dependency2__.matches;

    var ArrayProto = Array.prototype;

    // Filter the collection by selector or function.

    function filter(selector) {
        var callback = typeof selector === 'function' ? selector : function(element) {
            return matches(element, selector);
        };
        return $(ArrayProto.filter.call(this, callback));
    }

    function each(callback) {
        return _each(this, callback);
    }

    function reverse() {
        var elements = ArrayProto.slice.call(this);
        return $(ArrayProto.reverse.call(elements));
    }

    var every = ArrayProto.every,
        forEach = each,
        map = ArrayProto.map,
        some = ArrayProto.some;

    __exports__.each = each;
    __exports__.every = every;
    __exports__.filter = filter;
    __exports__.forEach = forEach;
    __exports__.map = map;
    __exports__.reverse = reverse;
    __exports__.some = some;
  });
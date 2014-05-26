define([], function() {
  "use strict";
  var __moduleName = "util";
  var global = new Function("return this")(),
      slice = Array.prototype.slice;
  var toArray = (function(collection) {
    return slice.call(collection);
  });
  var makeIterable = (function(element) {
    return element.nodeType || element === window ? [element] : element;
  });
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
    for (var sources = [],
        $__0 = 1; $__0 < arguments.length; $__0++)
      sources[$__0 - 1] = arguments[$__0];
    sources.forEach(function(src) {
      if (src) {
        for (var prop in src) {
          target[prop] = src[prop];
        }
      }
    });
    return target;
  }
  ;
  return {
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
});

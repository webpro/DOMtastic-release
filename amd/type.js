"use strict";

define(["exports"], function (exports) {
  function isFunction(obj) {
    return typeof obj === "function";
  }

  var isArray = Array.isArray;

  exports.isArray = isArray;
  exports.isFunction = isFunction;
});
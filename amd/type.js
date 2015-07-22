define(['exports'], function (exports) {
  /**
   * @module Type
   */

  /*
   * Determine if the argument passed is a Javascript function object.
   *
   * @param {Object} [obj] Object to test whether or not it is a function.
   * @return {boolean}
   * @example
   *     $.isFunction(function(){});
   *     // true
   * @example
   *     $.isFunction({});
   *     // false
   */

  'use strict';

  exports.__esModule = true;
  function isFunction(obj) {
    return typeof obj === 'function';
  }

  /*
   * Determine whether the argument is an array.
   *
   * @param {Object} [obj] Object to test whether or not it is an array.
   * @return {boolean}
   * @example
   *     $.isArray([]);
   *     // true
   * @example
   *     $.isArray({});
   *     // false
   */

  var isArray = Array.isArray;

  /*
   * Export interface
   */

  exports.isArray = isArray;
  exports.isFunction = isFunction;
});
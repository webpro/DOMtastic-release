define(['exports', './util'], function (exports, _util) {
  /**
   * @module noConflict
   */

  'use strict';

  exports.__esModule = true;

  /*
   * Save the previous value of the global `$` variable, so that it can be restored later on.
   * @private
   */

  var previousLib = _util.global.$;

  /**
   * In case another library sets the global `$` variable before DOMtastic does,
   * this method can be used to return the global `$` to that other library.
   *
   * @return {Object} Reference to DOMtastic.
   * @example
   *     var domtastic = $.noConflict();
   */

  function noConflict() {
    _util.global.$ = previousLib;
    return this;
  }

  /*
   * Export interface
   */

  exports.noConflict = noConflict;
});
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * @module noConflict
 */

var _global = require('./util');

/*
 * Save the previous value of the global `$` variable, so that it can be restored later on.
 * @private
 */

var previousLib = _global.global.$;

/**
 * In case another library sets the global `$` variable before DOMtastic does,
 * this method can be used to return the global `$` to that other library.
 *
 * @return {Object} Reference to DOMtastic.
 * @example
 *     var domtastic = $.noConflict();
 */

function noConflict() {
  _global.global.$ = previousLib;
  return this;
}

/*
 * Export interface
 */

exports.noConflict = noConflict;
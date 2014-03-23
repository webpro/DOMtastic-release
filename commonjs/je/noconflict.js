"use strict";
/**
 * @module noConflict
 */

var global = require("./util").global;

/*
 * Save the previous value of the global `$` variable, so that it can be restored later on.
 * @private
 */

var previousLib = global.$;

/**
 * In case another library sets the global `$` variable before jQuery Evergreen does,
 * this method can be used to return the global `$` to that other library.
 *
 * @return {Object} Reference to jQuery Evergreen.
 * @example
 *     var $E = $.noConflict();
 */

function noConflict() {
    global.$ = previousLib;
    return this;
}

/*
 * Export interface
 */

exports.noConflict = noConflict;
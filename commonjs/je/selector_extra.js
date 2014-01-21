"use strict";
// # Selector (extra)

var each = require('./util').each;
var $ = require("./selector").$;
var matches = require("./selector").matches;

/*
 * ## children
 *
 * Return children of each element in the collection (optionally filtered by a selector).
 *
 *     $('.selector').children();
 *     $('.selector').children('.filter');
 */

var children = function(selector) {
    var nodes = [];
    each(this, function(element) {
        each(element.children, function(child) {
            if (!selector || (selector && matches(child, selector))) {
                nodes.push(child);
            }
        });
    });
    return $(nodes);
};

/**
 * ## eq
 *
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @returns {$Object}
 */

var eq = function(index) {
    return slice.call(this, index, index + 1);
};

/**
 * ## get
 *
 * Return the DOM element at the provided index.
 *
 * @param {Number} index
 * @returns {Node}
 */

var get = function(index) {
    return this[index];
};

/**
 * ## slice
 *
 * Return a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @returns {$Object}
 */

var slice = function(start, end) {
    return $([].slice.apply(this, arguments));
};

exports.children = children;
exports.eq = eq;
exports.get = get;
exports.slice = slice;
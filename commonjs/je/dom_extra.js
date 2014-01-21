"use strict";
// # DOM Manipulation (extra)

var each = require("./util").each;
var append = require("./dom").append;
var before = require("./dom").before;
var after = require("./dom").after;
var $ = require("./selector").$;

/**
 * ## appendTo
 *
 * Inverse of [append](dom.html#append).
 *
 *     $('.item').appendTo(container);
 *
 * @param {Node|NodeList|$Object} element What to append the element(s) to.
 * Clones elements as necessary.
 * @return {$Object}
 */

function appendTo(element) {
    var context = typeof element === 'string' ? $(element) : element;
    append.call(context, this);
    return this;
}

/**
 * ## remove
 *
 * Remove the collection from the DOM.
 *
 * @return {Array} Removed elements
 */

function remove() {
    return each(this, function(element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

/**
 * ## replaceWith
 *
 * Replace each element in the collection with the provided new content, and return the array of elements that were removed.
 *
 * @return {Array}
 */

function replaceWith() {
    return before.apply(this, arguments).remove();
}

// Export interface

exports.appendTo = appendTo;
exports.remove = remove;
exports.replaceWith = replaceWith;
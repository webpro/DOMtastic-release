'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @module Selector (extra)
 */

var _each$toArray = require('../util');

var _$$matches = require('./index');

/**
 * Return children of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').children();
 *     $('.selector').children('.filter');
 */

function children(selector) {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        if (element.children) {
            _each$toArray.each(element.children, function (child) {
                if (!selector || selector && _$$matches.matches(child, selector)) {
                    nodes.push(child);
                }
            });
        }
    });
    return _$$matches.$(nodes);
}

/**
 * Return child nodes of each element in the collection, including text and comment nodes.
 *
 * @return {Object} New wrapped collection
 * @example
 *     $('.selector').contents();
 */

function contents() {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        nodes.push.apply(nodes, _each$toArray.toArray(element.childNodes));
    });
    return _$$matches.$(nodes);
}

/**
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.items').eq(1)
 *     // The second item; result is the same as doing $($('.items')[1]);
 */

function eq(index) {
    return slice.call(this, index, index + 1);
}

/**
 * Return the DOM element at the specified index.
 *
 * @param {Number} index
 * @return {Node} Element at the specified index
 * @example
 *     $('.items').get(1)
 *     // The second element; result is the same as doing $('.items')[1];
 */

function get(index) {
    return this[index];
}

/**
 * Return the parent elements of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').parent();
 *     $('.selector').parent('.filter');
 */

function parent(selector) {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        if (!selector || selector && _$$matches.matches(element.parentNode, selector)) {
            nodes.push(element.parentNode);
        }
    });
    return _$$matches.$(nodes);
}

/**
 * Return the sibling elements of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').siblings();
 *     $('.selector').siblings('.filter');
 */

function siblings(selector) {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        _each$toArray.each(element.parentNode.children, function (sibling) {
            if (sibling !== element && (!selector || selector && _$$matches.matches(sibling, selector))) {
                nodes.push(sibling);
            }
        });
    });
    return _$$matches.$(nodes);
}

/**
 * Create a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @return {Object} New wrapped collection
 * @example
 *     $('.items').slice(1, 3)
 *     // New wrapped collection containing the second, third, and fourth element.
 */

function slice(start, end) {
    return _$$matches.$([].slice.apply(this, arguments));
}

/*
 * Export interface
 */

exports.children = children;
exports.contents = contents;
exports.eq = eq;
exports.get = get;
exports.parent = parent;
exports.siblings = siblings;
exports.slice = slice;
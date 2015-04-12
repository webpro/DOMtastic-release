'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @module DOM (extra)
 */

var _each = require('../util');

var _append$before$after = require('./index');

var _$ = require('../selector/index');

/**
 * Append each element in the collection to the specified element(s).
 *
 * @param {Node|NodeList|Object} element What to append the element(s) to. Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').appendTo(container);
 */

function appendTo(element) {
    var context = typeof element === 'string' ? _$.$(element) : element;
    _append$before$after.append.call(context, this);
    return this;
}

/*
 * Empty each element in the collection.
 *
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').empty();
 */

function empty() {
    return _each.each(this, function (element) {
        element.innerHTML = '';
    });
}

/**
 * Remove the collection from the DOM.
 *
 * @return {Array} Array containing the removed elements
 * @example
 *     $('.item').remove();
 */

function remove() {
    return _each.each(this, function (element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

/**
 * Replace each element in the collection with the provided new content, and return the array of elements that were replaced.
 *
 * @return {Array} Array containing the replaced elements
 */

function replaceWith() {
    return _append$before$after.before.apply(this, arguments).remove();
}

/**
 * Get the `textContent` from the first, or set the `textContent` of each element in the collection.
 *
 * @param {String} [value]
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').text('New content');
 */

function text(value) {

    if (value === undefined) {
        return this[0].textContent;
    }

    _each.each(this, function (element) {
        element.textContent = '' + value;
    });

    return this;
}

/**
 * Get the `value` from the first, or set the `value` of each element in the collection.
 *
 * @param {String} [value]
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('input.firstName').value('New value');
 */

function val(value) {

    if (value === undefined) {
        return this[0].value;
    }

    _each.each(this, function (element) {
        element.value = value;
    });

    return this;
}

/*
 * Export interface
 */

exports.appendTo = appendTo;
exports.empty = empty;
exports.remove = remove;
exports.replaceWith = replaceWith;
exports.text = text;
exports.val = val;
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @module closest
 */

var _$$matches = require('./index');

var _each$uniq = require('../util');

/**
 * Return the closest element matching the selector (starting by itself) for each element in the collection.
 *
 * @param {String} selector Filter
 * @param {Object} [context] If provided, matching elements must be a descendant of this element
 * @return {Object} New wrapped collection (containing zero or one element)
 * @chainable
 * @example
 *     $('.selector').closest('.container');
 */

var closest = (function () {

    function closest(selector, context) {
        var nodes = [];
        _each$uniq.each(this, function (node) {
            while (node && node !== context) {
                if (_$$matches.matches(node, selector)) {
                    nodes.push(node);
                    break;
                }
                node = node.parentElement;
            }
        });
        return _$$matches.$(_each$uniq.uniq(nodes));
    }

    return !Element.prototype.closest ? closest : function (selector, context) {
        if (!context) {
            var nodes = [];
            _each$uniq.each(this, function (node) {
                var n = node.closest(selector);
                if (n) {
                    nodes.push(n);
                }
            });
            return _$$matches.$(_each$uniq.uniq(nodes));
        } else {
            return closest.call(this, selector, context);
        }
    };
})();

/*
 * Export interface
 */

exports.closest = closest;
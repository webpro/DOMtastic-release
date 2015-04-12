define(['exports', './index', '../util'], function (exports, _index, _util) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

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
            _util.each(this, function (node) {
                while (node && node !== context) {
                    if (_index.matches(node, selector)) {
                        nodes.push(node);
                        break;
                    }
                    node = node.parentElement;
                }
            });
            return _index.$(_util.uniq(nodes));
        }

        return !Element.prototype.closest ? closest : function (selector, context) {
            if (!context) {
                var nodes = [];
                _util.each(this, function (node) {
                    var n = node.closest(selector);
                    if (n) {
                        nodes.push(n);
                    }
                });
                return _index.$(_util.uniq(nodes));
            } else {
                return closest.call(this, selector, context);
            }
        };
    })();

    /*
     * Export interface
     */

    exports.closest = closest;
});
/**
 * @module closest
 */
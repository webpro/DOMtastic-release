define(["exports", "./index", "../util"], function (exports, _index, _util) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * @module closest
     */

    var matches = _index.matches;
    var each = _util.each;
    var uniq = _util.uniq;

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
            each(this, function (node) {
                while (node && node !== context) {
                    if (matches(node, selector)) {
                        nodes.push(node);
                        break;
                    }
                    node = node.parentElement;
                }
            });
            return $(uniq(nodes));
        }

        return !Element.prototype.closest ? closest : function (selector, context) {
            if (!context) {
                var nodes = [];
                each(this, function (node) {
                    var n = node.closest(selector);
                    if (n) {
                        nodes.push(n);
                    }
                });
                return $(uniq(nodes));
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
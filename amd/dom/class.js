define(['exports', '../util'], function (exports, _util) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    /**
     * Add a class to the element(s)
     *
     * @param {String} value Space-separated class name(s) to add to the element(s).
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').addClass('bar');
     *     $('.item').addClass('bar foo');
     */

    function addClass(value) {
        if (value && value.length) {
            _util.each(value.split(' '), _each.bind(this, 'add'));
        }
        return this;
    }

    /**
     * Remove a class from the element(s)
     *
     * @param {String} value Space-separated class name(s) to remove from the element(s).
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.items').removeClass('bar');
     *     $('.items').removeClass('bar foo');
     */

    function removeClass(value) {
        if (value && value.length) {
            _util.each(value.split(' '), _each.bind(this, 'remove'));
        }
        return this;
    }

    /**
     * Toggle a class at the element(s)
     *
     * @param {String} value Space-separated class name(s) to toggle at the element(s).
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').toggleClass('bar');
     *     $('.item').toggleClass('bar foo');
     */

    function toggleClass(value) {
        if (value && value.length) {
            _util.each(value.split(' '), _each.bind(this, 'toggle'));
        }
        return this;
    }

    /**
     * Check if the element(s) have a class.
     *
     * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
     * returns `true` if _any_ of them contains the class name.
     * @return {Boolean} Whether the element's class attribute contains the class name.
     * @example
     *     $('.item').hasClass('bar');
     */

    function hasClass(value) {
        return (this.nodeType ? [this] : this).some(function (element) {
            return element.classList.contains(value);
        });
    }

    /**
     * Specialized iteration, applying `fn` of the classList API to each element.
     *
     * @param {String} fnName
     * @param {String} className
     * @private
     */

    function _each(fnName, className) {
        _util.each(this, function (element) {
            element.classList[fnName](className);
        });
    }

    /*
     * Export interface
     */

    exports.addClass = addClass;
    exports.removeClass = removeClass;
    exports.toggleClass = toggleClass;
    exports.hasClass = hasClass;
});
/**
 * @module Class
 */
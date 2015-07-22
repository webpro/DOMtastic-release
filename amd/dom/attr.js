define(['exports', '../util'], function (exports, _util) {
    /**
     * @module Attr
     */

    'use strict';

    exports.__esModule = true;

    /**
     * Get the value of an attribute for the first element, or set one or more attributes for each element in the collection.
     *
     * @param {String|Object} key The name of the attribute to get or set. Or an object containing key-value pairs to set as attributes.
     * @param {String} [value] The value of the attribute to set.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').attr('attrName'); // get
     *     $('.item').attr('attrName', 'attrValue'); // set
     *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2}); // set multiple
     */

    function attr(key, value) {

        if (typeof key === 'string' && typeof value === 'undefined') {
            var element = this.nodeType ? this : this[0];
            return element ? element.getAttribute(key) : undefined;
        }

        _util.each(this, function (element) {
            if (typeof key === 'object') {
                for (var _attr in key) {
                    element.setAttribute(_attr, key[_attr]);
                }
            } else {
                element.setAttribute(key, value);
            }
        });

        return this;
    }

    /**
     * Remove attribute from each element in the collection.
     *
     * @param {String} key Attribute name
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.items').removeAttr('attrName');
     */

    function removeAttr(key) {
        _util.each(this, function (element) {
            return element.removeAttribute(key);
        });
        return this;
    }

    /*
     * Export interface
     */

    exports.attr = attr;
    exports.removeAttr = removeAttr;
});
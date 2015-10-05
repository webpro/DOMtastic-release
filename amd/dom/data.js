define(['exports', '../util'], function (exports, _util) {
    /**
     * @module Data
     */

    'use strict';

    exports.__esModule = true;

    var DATAKEYPROP = '__DOMTASTIC_DATA__';

    /**
     * Get data from first element, or set data for each element in the collection.
     *
     * @param {String} key The key for the data to get or set.
     * @param {String} [value] The data to set.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').data('attrName'); // get
     *     $('.item').data('attrName', {any: 'data'}); // set
     */

    function data(key, value) {

        if (typeof key === 'string' && typeof value === 'undefined') {
            var element = this.nodeType ? this : this[0];
            return element && element[DATAKEYPROP] ? element[DATAKEYPROP][key] : undefined;
        }

        _util.each(this, function (element) {
            element[DATAKEYPROP] = element[DATAKEYPROP] || {};
            element[DATAKEYPROP][key] = value;
        });

        return this;
    }

    /**
     * Get property from first element, or set property on each element in the collection.
     *
     * @param {String} key The name of the property to get or set.
     * @param {String} [value] The value of the property to set.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').prop('attrName'); // get
     *     $('.item').prop('attrName', 'attrValue'); // set
     */

    function prop(key, value) {

        if (typeof key === 'string' && typeof value === 'undefined') {
            var element = this.nodeType ? this : this[0];
            return element && element ? element[key] : undefined;
        }

        _util.each(this, function (element) {
            return element[key] = value;
        });

        return this;
    }

    /*
     * Export interface
     */

    exports.data = data;
    exports.prop = prop;
});
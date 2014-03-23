define(
  ["./util","./selector","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    /**
     * @module Array
     */

    var _each = __dependency1__.each;
    var $ = __dependency2__.$;
    var matches = __dependency2__.matches;

    var ArrayProto = Array.prototype;

    /**
     * Filter the collection by selector or function.
     *
     * @param {String|Function} selector Selector or function to filter the collection.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.items').filter('.active');
     * @example
     *     $('.items').filter(function(element) {
     *         return element.hasAttribute('active')
     *     });
     */

    function filter(selector) {
        var callback = typeof selector === 'function' ? selector : function(element) {
            return matches(element, selector);
        };
        return $(ArrayProto.filter.call(this, callback));
    }

    /**
     * Execute a function for each element in the collection.
     *
     * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.items').each(function(element) {
     *         element.style.color = 'evergreen';
     *     );
     */

    function each(callback) {
        return _each(this, callback);
    }

    var forEach = each;

    /**
     * Create a new collection by executing the callback for each element in the collection.
     *
     * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
     * @return {Array} Collection with the return value of the executed callback for each element.
     * @example
     *     $('.items').map(function(element) {
     *         return element.getAttribute('name')
     *     });
     *     ➤ ['ever', 'green']
     */

    var map = ArrayProto.map;

    /**
     * Reverses an array in place. The first array element becomes the last and the last becomes the first.
     *
     * @return {Object} The wrapped collection, reversed
     * @chainable
     * @example
     *     $('.items').reverse();
     */

    function reverse() {
        var elements = ArrayProto.slice.call(this);
        return $(ArrayProto.reverse.call(elements));
    }

    /**
     * Checks if the given callback returns a true(-ish) value for each element in the collection.
     *
     * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
     * @return {Boolean} Whether each element passed the callback check.
     * @example
     *     $('.items').every(function(element) {
     *         return element.hasAttribute('active')
     *     });
     *     ➤ true/false
     */

    var every = ArrayProto.every;

    /**
     * Checks if the given callback returns a true(-ish) value for any of the elements in the collection.
     *
     * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
     * @return {Boolean} Whether any element passed the callback check.
     * @example
     *     $('.items').some(function(element) {
     *         return element.hasAttribute('active')
     *     });
     *     ➤ true/false
     */

    var some = ArrayProto.some;

    /**
     * Returns the index of an element in the collection.
     *
     * @param {Node} element
     * @return {Number} The zero-based index, -1 if not found.
     * @example
     *     $('.items').indexOf(element);
     *     ➤ 2
     */

    var indexOf = ArrayProto.indexOf;

    /*
     * Export interface
     */

    __exports__.each = each;
    __exports__.every = every;
    __exports__.filter = filter;
    __exports__.forEach = forEach;
    __exports__.indexOf = indexOf;
    __exports__.map = map;
    __exports__.reverse = reverse;
    __exports__.some = some;
  });
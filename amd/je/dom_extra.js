define(
  ["./util","./dom","./selector","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    // # DOM Manipulation (extra)

    var each = __dependency1__.each;
    var append = __dependency2__.append;
    var before = __dependency2__.before;
    var after = __dependency2__.after;
    var $ = __dependency3__.$;

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

    __exports__.appendTo = appendTo;
    __exports__.remove = remove;
    __exports__.replaceWith = replaceWith;
  });
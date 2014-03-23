define(
  ["./util","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    /**
     * @module DOM
     */

    var toArray = __dependency1__.toArray;

    /**
     * Append element(s) to each element in the collection.
     *
     * @param {String|Node|NodeList|Object} element What to append to the element(s).
     * Clones elements as necessary.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').append('<p>more</p>');
     */

    function append(element) {
        if (this instanceof Node) {
            if (typeof element === 'string') {
                this.insertAdjacentHTML('beforeend', element);
            } else {
                if (element instanceof Node) {
                    this.appendChild(element);
                } else {
                    var elements = element instanceof NodeList ? toArray(element) : element;
                    elements.forEach(this.appendChild.bind(this));
                }
            }
        } else {
            var l = this.length;
            while (l--) {
                var elm = l === 0 ? element : clone(element);
                append.call(this[l], elm);
            }
        }
        return this;
    }

    /**
     * Place element(s) before each element in the collection.
     *
     * @param {String|Node|NodeList|Object} element What to place as sibling(s) before to the element(s).
     * Clones elements as necessary.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.items').before('<p>prefix</p>');
     */

    function before(element) {
        if (this instanceof Node) {
            if (typeof element === 'string') {
                this.insertAdjacentHTML('beforebegin', element);
            } else {
                if (element instanceof Node) {
                    this.parentNode.insertBefore(element, this);
                } else {
                    var elements = element instanceof NodeList ? toArray(element) : element;
                    elements.forEach(before.bind(this));
                }
            }
        } else {
            var l = this.length;
            while (l--) {
                var elm = l === 0 ? element : clone(element);
                before.call(this[l], elm);
            }
        }
        return this;
    }

    /**
     * Place element(s) after each element in the collection.
     *
     * @param {String|Node|NodeList|Object} element What to place as sibling(s) after to the element(s). Clones elements as necessary.
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.items').after('<span>suf</span><span>fix</span>');
     */

    function after(element) {
        if (this instanceof Node) {
            if (typeof element === 'string') {
                this.insertAdjacentHTML('afterend', element);
            } else {
                if (element instanceof Node) {
                    this.parentNode.insertBefore(element, this.nextSibling);
                } else {
                    var elements = element instanceof NodeList ? toArray(element) : element;
                    elements.reverse().forEach(after.bind(this));
                }
            }
        } else {
            var l = this.length;
            while (l--) {
                var elm = l === 0 ? element : clone(element);
                after.call(this[l], elm);
            }
        }
        return this;
    }

    /**
     * Clone an object
     *
     * @param {String|Node|NodeList|Array} element The element(s) to clone.
     * @return {String|Node|NodeList|Array} The cloned element(s)
     * @private
     */

    function clone(element) {
        if (typeof element === 'string') {
            return element;
        } else if (element instanceof Node) {
            return element.cloneNode(true);
        } else if ('length' in element) {
            return [].map.call(element, function(el) {
                return el.cloneNode(true);
            });
        }
        return element;
    }

    /*
     * Export interface
     */

    __exports__.append = append;
    __exports__.before = before;
    __exports__.after = after;
  });
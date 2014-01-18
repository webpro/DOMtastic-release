define(
  ["./util","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // # Class methods

    var makeIterable = __dependency1__.makeIterable;
    var each = __dependency1__.each;

    /**
     * ## addClass
     *
     *     $('.item').addClass('bar');
     *
     * @param {string} value The class name to add to the element(s).
     * @return {$Object} or Node/List in native mode (`this`)
     */

    var addClass = function(value) {
        each(this, function(element) {
            element.classList.add(value);
        });
        return this;
    };

    /**
     * ## removeClass
     *
     *     $('.items').removeClass('bar');
     *
     * @param {string} value The class name to remove from the element(s).
     * @return {$Object} or Node/List in native mode (`this`)
     */

    var removeClass = function(value) {
        each(this, function(element) {
            element.classList.remove(value);
        });
        return this;
    };

    /**
     * ## toggleClass
     *
     *     $('.item').toggleClass('bar');
     *
     * @param {string} value The class name to toggle at the element(s).
     * @return {$Object} or Node/List in native mode (`this`)
     */

    var toggleClass = function(value) {
        each(this, function(element) {
            element.classList.toggle(value);
        });
        return this;
    };

    /**
     * ## hasClass
     *
     *     $('.item').hasClass('bar');
     *
     * @param {string} value Check if the DOM element contains the class name. When applied to multiple elements,
     * returns `true` if _any_ of them contains the class name.
     * @return {boolean}
     */

    var hasClass = function(value) {
        return makeIterable(this).some(function(element) {
            return element.classList.contains(value);
        });
    };

    // Export interface

    __exports__.addClass = addClass;
    __exports__.removeClass = removeClass;
    __exports__.toggleClass = toggleClass;
    __exports__.hasClass = hasClass;
  });
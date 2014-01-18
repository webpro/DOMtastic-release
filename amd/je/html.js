define(
  ["./util","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // # HTML

    var each = __dependency1__.each;

    /*
     * ## html
     *
     *     $('.item').html();
     *     $('.item').html('<span>more</span>');
     *
     * @param {String} [fragment] HTML fragment to set for the element
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var html = function(fragment) {

        if (!fragment) {
            return (this.nodeType ? this : this[0]).innerHTML;
        }

        each(this, function(element) {
            element.innerHTML = fragment;
        });
        return this;

    };

    // Export interface

    __exports__["default"] = html;
  });
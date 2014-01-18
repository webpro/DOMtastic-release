define(
  ["./util","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    // # Attr

    var each = __dependency1__.each;

    /**
     * ## attr
     *
     *     $('.item').attr('attrName');
     *     $('.item').attr('attrName', 'attrValue');
     *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2});
     */

    var attr = function(key, value) {

        if (typeof key === 'string' && typeof value === 'undefined') {
            return (this.nodeType ? this : this[0]).getAttribute(key);
        }

        each(this, function(element) {
            if (typeof key === 'object') {
                for (var attr in key) {
                    element.setAttribute(attr, key[attr]);
                }
            } else {
                element.setAttribute(key, value);
            }
        });

        return this;
    };

    // Export interface

    __exports__["default"] = attr;
  });
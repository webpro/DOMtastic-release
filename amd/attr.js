define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "attr";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var each = ($__0).each;
  function attr(key, value) {
    if (typeof key === 'string' && typeof value === 'undefined') {
      var element = this.nodeType ? this : this[0];
      return element ? element.getAttribute(key) : undefined;
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
  }
  function removeAttr(key) {
    each(this, function(element) {
      element.removeAttribute(key);
    });
    return this;
  }
  ;
  return {
    get attr() {
      return attr;
    },
    get removeAttr() {
      return removeAttr;
    },
    __esModule: true
  };
});

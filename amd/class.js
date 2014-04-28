define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "class";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var $__1 = $__0,
      makeIterable = $__1.makeIterable,
      each = $__1.each;
  function addClass(value) {
    each(this, function(element) {
      element.classList.add(value);
    });
    return this;
  }
  function removeClass(value) {
    each(this, function(element) {
      element.classList.remove(value);
    });
    return this;
  }
  function toggleClass(value) {
    each(this, function(element) {
      element.classList.toggle(value);
    });
    return this;
  }
  function hasClass(value) {
    return makeIterable(this).some(function(element) {
      return element.classList.contains(value);
    });
  }
  ;
  return {
    get addClass() {
      return addClass;
    },
    get removeClass() {
      return removeClass;
    },
    get toggleClass() {
      return toggleClass;
    },
    get hasClass() {
      return hasClass;
    },
    __esModule: true
  };
});

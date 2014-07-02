define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "class";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var $__1 = $__0,
      makeIterable = $__1.makeIterable,
      each = $__1.each;
  function addClass(value) {
    if (value && value.length) {
      each(value.split(' '), function(className) {
        each(this, function(element) {
          element.classList.add(className);
        });
      }.bind(this));
    }
    return this;
  }
  function removeClass(value) {
    if (value && value.length) {
      each(value.split(' '), function(className) {
        each(this, function(element) {
          element.classList.remove(className);
        });
      }.bind(this));
    }
    return this;
  }
  function toggleClass(value) {
    if (value && value.length) {
      each(value.split(' '), function(className) {
        each(this, function(element) {
          element.classList.toggle(className);
        });
      }.bind(this));
    }
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

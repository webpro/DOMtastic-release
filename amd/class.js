"use strict";

define(["exports", "./util"], function (exports, _util) {
  var each = _util.each;


  function addClass(value) {
    if (value && value.length) {
      each(value.split(" "), _each.bind(this, "add"));
    }
    return this;
  }

  function removeClass(value) {
    if (value && value.length) {
      each(value.split(" "), _each.bind(this, "remove"));
    }
    return this;
  }

  function toggleClass(value) {
    if (value && value.length) {
      each(value.split(" "), _each.bind(this, "toggle"));
    }
    return this;
  }

  function hasClass(value) {
    return (this.nodeType ? [this] : this).some(function (element) {
      return element.classList.contains(value);
    });
  }

  function _each(fnName, className) {
    each(this, function (element) {
      element.classList[fnName](className);
    });
  }

  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.toggleClass = toggleClass;
  exports.hasClass = hasClass;
});
define(["exports", "./util"], function (exports, _util) {
  "use strict";

  var each = _util.each;


  function addClass(value) {
    if (value && value.length) {
      each(value.split(" "), (function (className) {
        each(this, function (element) {
          element.classList.add(className);
        });
      }).bind(this));
    }
    return this;
  }

  function removeClass(value) {
    if (value && value.length) {
      each(value.split(" "), (function (className) {
        each(this, function (element) {
          element.classList.remove(className);
        });
      }).bind(this));
    }
    return this;
  }

  function toggleClass(value) {
    if (value && value.length) {
      each(value.split(" "), (function (className) {
        each(this, function (element) {
          element.classList.toggle(className);
        });
      }).bind(this));
    }
    return this;
  }

  function hasClass(value) {
    return (this.nodeType ? [this] : this).some(function (element) {
      return element.classList.contains(value);
    });
  }

  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.toggleClass = toggleClass;
  exports.hasClass = hasClass;
});
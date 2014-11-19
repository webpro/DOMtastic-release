define(["exports", "./util"], function (exports, _util) {
  "use strict";

  var each = _util.each;


  function html(fragment) {
    if (typeof fragment !== "string") {
      var element = this.nodeType ? this : this[0];
      return element ? element.innerHTML : undefined;
    }

    each(this, function (element) {
      element.innerHTML = fragment;
    });

    return this;
  }

  exports.html = html;
});
"use strict";

define(["exports"], function (exports) {
  function ready(handler) {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      handler();
    } else {
      document.addEventListener("DOMContentLoaded", handler, false);
    }
    return this;
  }

  exports.ready = ready;
});
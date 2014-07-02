define([], function() {
  "use strict";
  var __moduleName = "ready";
  function ready(handler) {
    if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
      handler();
    } else {
      document.addEventListener('DOMContentLoaded', handler, false);
    }
    return this;
  }
  ;
  return {
    get ready() {
      return ready;
    },
    __esModule: true
  };
});

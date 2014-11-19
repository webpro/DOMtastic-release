define(["exports", "./util"], function (exports, _util) {
  "use strict";

  var global = _util.global;


  var previousLib = global.$;

  function noConflict() {
    global.$ = previousLib;
    return this;
  }

  exports.noConflict = noConflict;
});
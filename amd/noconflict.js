"use strict";

define(["exports", "./util"], function (exports, _util) {
  var global = _util.global;


  var previousLib = global.$;

  function noConflict() {
    global.$ = previousLib;
    return this;
  }

  exports.noConflict = noConflict;
});
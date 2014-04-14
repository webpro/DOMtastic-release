define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "noconflict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var global = ($__0).global;
  var previousLib = global.$;
  function noConflict() {
    global.$ = previousLib;
    return this;
  }
  ;
  return {
    get noConflict() {
      return noConflict;
    },
    __esModule: true
  };
});

"use strict";
var __moduleName = "noconflict";
var global = require('./util').global;
var previousLib = global.$;
function noConflict() {
  global.$ = previousLib;
  return this;
}
;
module.exports = {
  get noConflict() {
    return noConflict;
  },
  __esModule: true
};

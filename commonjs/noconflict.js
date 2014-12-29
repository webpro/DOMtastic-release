"use strict";

var global = require("./util").global;


var previousLib = global.$;

function noConflict() {
  global.$ = previousLib;
  return this;
}

exports.noConflict = noConflict;
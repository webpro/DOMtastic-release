"use strict";
function __es6_transpiler_warn__(warning) {
  if (typeof console === 'undefined') {
  } else if (typeof console.warn === "function") {
    console.warn(warning);
  } else if (typeof console.log === "function") {
    console.log(warning);
  }
}
function __es6_transpiler_build_module_object__(name, imported) {
  var moduleInstanceObject = Object.create ? Object.create(null) : {};
  if (typeof imported === "function") {
    __es6_transpiler_warn__("imported module '"+name+"' exported a function - this may not work as expected");
  }
  for (var key in imported) {
    if (Object.prototype.hasOwnProperty.call(imported, key)) {
      moduleInstanceObject[key] = imported[key];
    }
  }
  if (Object.freeze) {
    Object.freeze(moduleInstanceObject);
  }
  return moduleInstanceObject;
}
// # API

var extend = require("./util").extend;

var api = {},
    apiNodeList = {},
    $ = {};

// Import modules to build up the API

var array = __es6_transpiler_build_module_object__("array", require("./array"));
var attr = __es6_transpiler_build_module_object__("attr", require("./attr"));
var className = __es6_transpiler_build_module_object__("className", require("./class"));
var dom = __es6_transpiler_build_module_object__("dom", require("./dom"));
var dom_extra = __es6_transpiler_build_module_object__("dom_extra", require("./dom_extra"));
var event = __es6_transpiler_build_module_object__("event", require("./event"));
var html = __es6_transpiler_build_module_object__("html", require("./html"));
var selector = __es6_transpiler_build_module_object__("selector", require("./selector"));
var selector_extra = __es6_transpiler_build_module_object__("selector_extra", require("./selector_extra"));

if (selector !== undefined) {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

var mode = __es6_transpiler_build_module_object__("mode", require("./mode"));
extend($, mode);
var noconflict = __es6_transpiler_build_module_object__("noconflict", require("./noconflict"));
extend($, noconflict);

extend(api, array, attr, className, dom, dom_extra, event, html, selector_extra);
extend(apiNodeList, array);

// Util

$.extend = extend;

// Internal properties to switch between default and native mode

$._api = api;
$._apiNodeList = apiNodeList;

// Export interface

exports["default"] = $;
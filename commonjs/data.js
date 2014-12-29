"use strict";

var each = require("./util").each;


var dataKeyProp = "__domtastic_data__";

function data(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element && element[dataKeyProp] ? element[dataKeyProp][key] : undefined;
  }

  each(this, function (element) {
    element[dataKeyProp] = element[dataKeyProp] || {};
    element[dataKeyProp][key] = value;
  });

  return this;
}

function prop(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element && element ? element[key] : undefined;
  }

  each(this, function (element) {
    element[key] = value;
  });

  return this;
}


exports.data = data;
exports.prop = prop;
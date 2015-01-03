"use strict";

var extend = require("./util").extend;


var api = {}, $ = {};

var array = require("./array");

var attr = require("./attr");

var class_ = require("./class");

var contains = require("./contains");

var css = require("./css");

var data = require("./data");

var dom = require("./dom");

var dom_extra = require("./dom_extra");

var event = require("./event");

var html = require("./html");

var noconflict = require("./noconflict");

var ready = require("./ready");

var selector = require("./selector");

var selector_extra = require("./selector_extra");

var trigger = require("./trigger");

var type = require("./type");

if (typeof selector !== "undefined") {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
  api.closest = selector.closest;
}

extend($, contains, noconflict, type);
extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

$.version = "0.9.1";

$.extend = extend;

module.exports = $;
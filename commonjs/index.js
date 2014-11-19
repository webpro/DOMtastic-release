"use strict";

var extend = require('./util').extend;


var api = {}, apiNodeList = {}, $ = {};

var array = require('./array');

var attr = require('./attr');

var class_ = require('./class');

var contains = require('./contains');

var css = require('./css');

var data = require('./data');

var dom = require('./dom');

var dom_extra = require('./dom_extra');

var event = require('./event');

var html = require('./html');

var mode = require('./mode');

var noconflict = require('./noconflict');

var ready = require('./ready');

var selector = require('./selector');

var selector_extra = require('./selector_extra');

var trigger = require('./trigger');

var type = require('./type');

if (typeof selector !== "undefined") {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
  api.closest = selector.closest;
}

extend($, contains, mode, noconflict, type);
extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);
extend(apiNodeList, array);

$.version = "0.8.3";

$.extend = extend;

$.fn = api;
$.fnList = apiNodeList;

exports["default"] = $;
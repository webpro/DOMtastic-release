"use strict";
var __moduleName = "api";
var extend = require('./util').extend;
var api = {},
    apiNodeList = {},
    $ = {};
var array = require('./array');
var attr = require('./attr');
var class_ = require('./class');
var data = require('./data');
var dom = require('./dom');
var dom_extra = require('./dom_extra');
var event = require('./event');
var html = require('./html');
var selector = require('./selector');
var selector_extra = require('./selector_extra');
if (typeof selector !== 'undefined') {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
}
var mode = require('./mode');
extend($, mode);
var noconflict = require('./noconflict');
extend($, noconflict);
var type = require('./type');
extend($, type);
extend(api, array, attr, class_, data, dom, dom_extra, event, html, selector_extra);
extend(apiNodeList, array);
$.version = '0.7.2';
$.extend = extend;
$.fn = api;
$.fnList = apiNodeList;
var $__default = $;
module.exports = {
  get default() {
    return $__default;
  },
  __esModule: true
};

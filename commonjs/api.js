"use strict";
var __moduleName = "api";
var extend = require('./util').extend;
var api = {},
    apiNodeList = {},
    $ = {};
var array = require('./array');
var attr = require('./attr');
var className = require('./class');
var dom = require('./dom');
var dom_extra = require('./dom_extra');
var event = require('./event');
var html = require('./html');
var selector = require('./selector');
var selector_extra = require('./selector_extra');
if (selector !== undefined) {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
}
var mode = require('./mode');
extend($, mode);
var noconflict = require('./noconflict');
extend($, noconflict);
extend(api, array, attr, className, dom, dom_extra, event, html, selector_extra);
extend(apiNodeList, array);
$.version = '0.6.1';
$.extend = extend;
$._api = api;
$._apiNodeList = apiNodeList;
var $__default = $;
module.exports = {
  get default() {
    return $__default;
  },
  __esModule: true
};

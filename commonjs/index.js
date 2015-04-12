'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @module API
 */

var _extend = require('./util');

// Import modules to build up the API

var _import = require('./array');

var array = _interopRequireWildcard(_import);

var _import2 = require('./dom/attr');

var attr = _interopRequireWildcard(_import2);

var _import3 = require('./dom/class');

var class_ = _interopRequireWildcard(_import3);

var _import4 = require('./dom/contains');

var contains = _interopRequireWildcard(_import4);

var _import5 = require('./css');

var css = _interopRequireWildcard(_import5);

var _import6 = require('./dom/data');

var data = _interopRequireWildcard(_import6);

var _import7 = require('./dom/index');

var dom = _interopRequireWildcard(_import7);

var _import8 = require('./dom/extra');

var dom_extra = _interopRequireWildcard(_import8);

var _import9 = require('./event/index');

var event = _interopRequireWildcard(_import9);

var _import10 = require('./dom/html');

var html = _interopRequireWildcard(_import10);

var _import11 = require('./noconflict');

var noconflict = _interopRequireWildcard(_import11);

var _import12 = require('./event/ready');

var ready = _interopRequireWildcard(_import12);

var _import13 = require('./selector/index');

var selector = _interopRequireWildcard(_import13);

var _import14 = require('./selector/closest');

var closest = _interopRequireWildcard(_import14);

var _import15 = require('./selector/extra');

var selector_extra = _interopRequireWildcard(_import15);

var _import16 = require('./event/trigger');

var trigger = _interopRequireWildcard(_import16);

var _import17 = require('./type');

var type = _interopRequireWildcard(_import17);

var api = {},
    $ = {};

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

_extend.extend($, contains, noconflict, type);
_extend.extend(api, array, attr, class_, closest, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

// Version

$.version = '0.10.2';

// Util

$.extend = _extend.extend;

// Export interface

exports['default'] = $;
module.exports = exports['default'];
/**
 * @module API
 */

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

// Import modules to build up the API

var _array = require('./array');

var array = _interopRequireWildcard(_array);

var _baseClass = require('./baseClass');

var _baseClass2 = _interopRequireDefault(_baseClass);

var _domAttr = require('./dom/attr');

var attr = _interopRequireWildcard(_domAttr);

var _domClass = require('./dom/class');

var class_ = _interopRequireWildcard(_domClass);

var _domContains = require('./dom/contains');

var contains = _interopRequireWildcard(_domContains);

var _css = require('./css');

var css = _interopRequireWildcard(_css);

var _domData = require('./dom/data');

var data = _interopRequireWildcard(_domData);

var _domIndex = require('./dom/index');

var dom = _interopRequireWildcard(_domIndex);

var _domExtra = require('./dom/extra');

var dom_extra = _interopRequireWildcard(_domExtra);

var _eventIndex = require('./event/index');

var event = _interopRequireWildcard(_eventIndex);

var _domHtml = require('./dom/html');

var html = _interopRequireWildcard(_domHtml);

var _noconflict = require('./noconflict');

var noconflict = _interopRequireWildcard(_noconflict);

var _eventReady = require('./event/ready');

var ready = _interopRequireWildcard(_eventReady);

var _selectorIndex = require('./selector/index');

var selector = _interopRequireWildcard(_selectorIndex);

var _selectorClosest = require('./selector/closest');

var closest = _interopRequireWildcard(_selectorClosest);

var _selectorExtra = require('./selector/extra');

var selector_extra = _interopRequireWildcard(_selectorExtra);

var _eventTrigger = require('./event/trigger');

var trigger = _interopRequireWildcard(_eventTrigger);

var _type = require('./type');

var type = _interopRequireWildcard(_type);

var api = {},
    $ = {};

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

_util.extend($, contains, noconflict, type);
_util.extend(api, array, attr, class_, closest, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

// Version

$.version = '0.12.1';

// Util

$.extend = _util.extend;

// Provide base class to extend from

if (typeof _baseClass2['default'] !== 'undefined') {
    $.BaseClass = _baseClass2['default']($.fn);
}

// Ugly interoperability hack, to prevent potential ES6 import issues

$['default'] = $;

// Export interface

exports['default'] = $;
module.exports = exports['default'];
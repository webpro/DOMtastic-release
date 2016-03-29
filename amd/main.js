define(['exports', 'module', './util', './array', './baseClass', './dom/attr', './dom/class', './dom/contains', './css', './dom/data', './dom/index', './dom/extra', './event/index', './dom/html', './noconflict', './event/ready', './selector/index', './selector/closest', './selector/extra', './event/trigger', './type'], function (exports, module, _util, _array, _baseClass, _domAttr, _domClass, _domContains, _css, _domData, _domIndex, _domExtra, _eventIndex, _domHtml, _noconflict, _eventReady, _selectorIndex, _selectorClosest, _selectorExtra, _eventTrigger, _type) {
    /**
     * @module API
     */

    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _BaseClass = _interopRequireDefault(_baseClass);

    var api = {},
        $ = {};

    // Import modules to build up the API

    if (typeof _selectorIndex !== 'undefined') {
        $ = _selectorIndex.$;
        $.matches = _selectorIndex.matches;
        api.find = _selectorIndex.find;
    }

    _util.extend($, _domContains, _noconflict, _type);
    _util.extend(api, _array, _domAttr, _domClass, _selectorClosest, _css, _domData, _domIndex, _domExtra, _eventIndex, _domHtml, _eventReady, _selectorExtra, _eventTrigger);

    $.fn = api;

    // Version

    $.version = '0.12.1';

    // Util

    $.extend = _util.extend;

    // Provide base class to extend from

    if (typeof _BaseClass['default'] !== 'undefined') {
        $.BaseClass = _BaseClass['default']($.fn);
    }

    // Ugly interoperability hack, to prevent potential ES6 import issues

    $['default'] = $;

    // Export interface

    module.exports = $;
});
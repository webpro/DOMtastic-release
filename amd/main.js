define(['exports', 'module', './util', './array', './dom/attr', './dom/class', './dom/contains', './css', './dom/data', './dom/index', './dom/extra', './event/index', './dom/html', './noconflict', './event/ready', './selector/index', './selector/closest', './selector/extra', './event/trigger', './type'], function (exports, module, _util, _array, _domAttr, _domClass, _domContains, _css, _domData, _domIndex, _domExtra, _eventIndex, _domHtml, _noconflict, _eventReady, _selectorIndex, _selectorClosest, _selectorExtra, _eventTrigger, _type) {
    /**
     * @module API
     */

    'use strict';

    var api = {},
        $ = {};

    if (typeof _selectorIndex !== 'undefined') {
        $ = _selectorIndex.$;
        $.matches = _selectorIndex.matches;
        api.find = _selectorIndex.find;
    }

    (0, _util.extend)($, _domContains, _noconflict, _type);
    (0, _util.extend)(api, _array, _domAttr, _domClass, _selectorClosest, _css, _domData, _domIndex, _domExtra, _eventIndex, _domHtml, _eventReady, _selectorExtra, _eventTrigger);

    $.fn = api;

    // Version

    $.version = '0.10.3';

    // Util

    $.extend = _util.extend;

    // Export interface

    module.exports = $;
});
// Import modules to build up the API
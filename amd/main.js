define(["exports", "module", "./util", "./array", "./dom/attr", "./dom/class", "./dom/contains", "./css", "./dom/data", "./dom/index", "./dom/extra", "./event/index", "./dom/html", "./noconflict", "./event/ready", "./selector/index", "./selector/closest", "./selector/extra", "./event/trigger", "./type"], function (exports, module, _util, _array, _domAttr, _domClass, _domContains, _css, _domData, _domIndex, _domExtra, _eventIndex, _domHtml, _noconflict, _eventReady, _selectorIndex, _selectorClosest, _selectorExtra, _eventTrigger, _type) {
    "use strict";

    /**
     * @module API
     */

    var extend = _util.extend;

    var api = {},
        $ = {};

    // Import modules to build up the API

    var array = _array;
    var attr = _domAttr;
    var class_ = _domClass;
    var contains = _domContains;
    var css = _css;
    var data = _domData;
    var dom = _domIndex;
    var dom_extra = _domExtra;
    var event = _eventIndex;
    var html = _domHtml;
    var noconflict = _noconflict;
    var ready = _eventReady;
    var selector = _selectorIndex;
    var closest = _selectorClosest;
    var selector_extra = _selectorExtra;
    var trigger = _eventTrigger;
    var type = _type;

    if (typeof selector !== "undefined") {
        $ = selector.$;
        $.matches = selector.matches;
        api.find = selector.find;
    }

    extend($, contains, noconflict, type);
    extend(api, array, attr, class_, closest, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

    $.fn = api;

    // Version

    $.version = "0.10.1";

    // Util

    $.extend = extend;

    // Export interface

    module.exports = $;
});
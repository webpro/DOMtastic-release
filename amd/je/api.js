define(
  ["./util","./array","./attr","./class","./dom","./dom_extra","./event","./html","./selector","./selector_extra","./mode","./noconflict","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __exports__) {
    "use strict";
    /**
     * @module API
     */

    var extend = __dependency1__.extend;

    var api = {},
        apiNodeList = {},
        $ = {};

    // Import modules to build up the API

    var array = __dependency2__;
    var attr = __dependency3__;
    var className = __dependency4__;
    var dom = __dependency5__;
    var dom_extra = __dependency6__;
    var event = __dependency7__;
    var html = __dependency8__;
    var selector = __dependency9__;
    var selector_extra = __dependency10__;

    if (selector !== undefined) {
        $ = selector.$;
        $.matches = selector.matches;
        api.find = selector.find;
    }

    var mode = __dependency11__;
    extend($, mode);
    var noconflict = __dependency12__;
    extend($, noconflict);

    extend(api, array, attr, className, dom, dom_extra, event, html, selector_extra);
    extend(apiNodeList, array);

    // Version

    $.version = '0.4.3';

    // Util

    $.extend = extend;

    // Internal properties to switch between default and native mode

    $._api = api;
    $._apiNodeList = apiNodeList;

    // Export interface

    __exports__["default"] = $;
  });
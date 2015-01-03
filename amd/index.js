"use strict";

define(["exports", "./util", "./array", "./attr", "./class", "./contains", "./css", "./data", "./dom", "./dom_extra", "./event", "./html", "./noconflict", "./ready", "./selector", "./selector_extra", "./trigger", "./type"], function (exports, _util, _array, _attr, _class, _contains, _css, _data, _dom, _domExtra, _event, _html, _noconflict, _ready, _selector, _selectorExtra, _trigger, _type) {
  var extend = _util.extend;


  var api = {}, $ = {};

  var array = _array;
  var attr = _attr;
  var class_ = _class;
  var contains = _contains;
  var css = _css;
  var data = _data;
  var dom = _dom;
  var dom_extra = _domExtra;
  var event = _event;
  var html = _html;
  var noconflict = _noconflict;
  var ready = _ready;
  var selector = _selector;
  var selector_extra = _selectorExtra;
  var trigger = _trigger;
  var type = _type;


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

  exports["default"] = $;
});
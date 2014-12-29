define(["exports", "./util", "./array", "./attr", "./class", "./contains", "./css", "./data", "./dom", "./dom_extra", "./event", "./html", "./mode", "./noconflict", "./ready", "./selector", "./selector_extra", "./trigger", "./type"], function (exports, _util, _array, _attr, _class, _contains, _css, _data, _dom, _domExtra, _event, _html, _mode, _noconflict, _ready, _selector, _selectorExtra, _trigger, _type) {
  "use strict";

  var extend = _util.extend;


  var api = {}, apiNodeList = {}, $ = {};

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
  var mode = _mode;
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

  extend($, contains, mode, noconflict, type);
  extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);
  extend(apiNodeList, array);

  $.version = "0.8.4";

  $.extend = extend;

  $.fn = api;
  $.fnList = apiNodeList;

  exports["default"] = $;
});
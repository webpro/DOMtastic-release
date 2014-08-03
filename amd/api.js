define(['./util', './array', './attr', './class', './contains', './css', './data', './dom', './dom_extra', './event', './html', './mode', './noconflict', './ready', './selector', './selector_extra', './type'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9,$__10,$__11,$__12,$__13,$__14,$__15,$__16) {
  "use strict";
  var __moduleName = "api";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  if (!$__3 || !$__3.__esModule)
    $__3 = {'default': $__3};
  if (!$__4 || !$__4.__esModule)
    $__4 = {'default': $__4};
  if (!$__5 || !$__5.__esModule)
    $__5 = {'default': $__5};
  if (!$__6 || !$__6.__esModule)
    $__6 = {'default': $__6};
  if (!$__7 || !$__7.__esModule)
    $__7 = {'default': $__7};
  if (!$__8 || !$__8.__esModule)
    $__8 = {'default': $__8};
  if (!$__9 || !$__9.__esModule)
    $__9 = {'default': $__9};
  if (!$__10 || !$__10.__esModule)
    $__10 = {'default': $__10};
  if (!$__11 || !$__11.__esModule)
    $__11 = {'default': $__11};
  if (!$__12 || !$__12.__esModule)
    $__12 = {'default': $__12};
  if (!$__13 || !$__13.__esModule)
    $__13 = {'default': $__13};
  if (!$__14 || !$__14.__esModule)
    $__14 = {'default': $__14};
  if (!$__15 || !$__15.__esModule)
    $__15 = {'default': $__15};
  if (!$__16 || !$__16.__esModule)
    $__16 = {'default': $__16};
  var extend = ($__0).extend;
  var api = {},
      apiNodeList = {},
      $ = {};
  var array = $__1;
  var attr = $__2;
  var class_ = $__3;
  var contains = $__4;
  var css = $__5;
  var data = $__6;
  var dom = $__7;
  var dom_extra = $__8;
  var event = $__9;
  var html = $__10;
  var mode = $__11;
  var noconflict = $__12;
  var ready = $__13;
  var selector = $__14;
  var selector_extra = $__15;
  var type = $__16;
  if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
    api.closest = selector.closest;
  }
  extend($, contains, mode, noconflict, type);
  extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra);
  extend(apiNodeList, array);
  $.version = '0.7.6';
  $.extend = extend;
  $.fn = api;
  $.fnList = apiNodeList;
  var $__default = $;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});

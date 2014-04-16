define(['./util', './array', './attr', './class', './dom', './dom_extra', './event', './html', './selector', './selector_extra', './mode', './noconflict'], function($__0,$__1,$__2,$__3,$__4,$__5,$__6,$__7,$__8,$__9,$__10,$__11) {
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
  var extend = ($__0).extend;
  var api = {},
      apiNodeList = {},
      $ = {};
  var array = $__1;
  var attr = $__2;
  var className = $__3;
  var dom = $__4;
  var dom_extra = $__5;
  var event = $__6;
  var html = $__7;
  var selector = $__8;
  var selector_extra = $__9;
  if (selector !== undefined) {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
  }
  var mode = $__10;
  extend($, mode);
  var noconflict = $__11;
  extend($, noconflict);
  extend(api, array, attr, className, dom, dom_extra, event, html, selector_extra);
  extend(apiNodeList, array);
  $.version = '0.5.1';
  $.extend = extend;
  $._api = api;
  $._apiNodeList = apiNodeList;
  var $__default = $;
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
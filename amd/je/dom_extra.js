define(['./util', './dom', './selector'], function($__0,$__1,$__2) {
  "use strict";
  var __moduleName = "dom_extra";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  if (!$__2 || !$__2.__esModule)
    $__2 = {'default': $__2};
  var each = ($__0).each;
  var $__3 = $__1,
      append = $__3.append,
      before = $__3.before,
      after = $__3.after;
  var $ = ($__2).$;
  function appendTo(element) {
    var context = typeof element === 'string' ? $(element) : element;
    append.call(context, this);
    return this;
  }
  function remove() {
    return each(this, function(element) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }
  function replaceWith() {
    return before.apply(this, arguments).remove();
  }
  ;
  return {
    get appendTo() {
      return appendTo;
    },
    get remove() {
      return remove;
    },
    get replaceWith() {
      return replaceWith;
    },
    __esModule: true
  };
});

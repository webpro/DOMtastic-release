define(['./selector'], function($__0) {
  "use strict";
  var __moduleName = "selector_extra";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var each = require('./util').each;
  var $__1 = $__0,
      $ = $__1.$,
      matches = $__1.matches;
  function children(selector) {
    var nodes = [];
    each(this, function(element) {
      each(element.children, function(child) {
        if (!selector || (selector && matches(child, selector))) {
          nodes.push(child);
        }
      });
    });
    return $(nodes);
  }
  function closest(selector) {
    var node = this[0];
    for (; node.nodeType !== node.DOCUMENT_NODE; node = node.parentNode) {
      if (matches(node, selector)) {
        return $(node);
      }
    }
    return $();
  }
  function parent(selector) {
    var nodes = [];
    each(this, function(element) {
      if (!selector || (selector && matches(element.parentNode, selector))) {
        nodes.push(element.parentNode);
      }
    });
    return $(nodes);
  }
  function eq(index) {
    return slice.call(this, index, index + 1);
  }
  function get(index) {
    return this[index];
  }
  function slice(start, end) {
    return $([].slice.apply(this, arguments));
  }
  ;
  return {
    get children() {
      return children;
    },
    get closest() {
      return closest;
    },
    get parent() {
      return parent;
    },
    get eq() {
      return eq;
    },
    get get() {
      return get;
    },
    get slice() {
      return slice;
    },
    __esModule: true
  };
});

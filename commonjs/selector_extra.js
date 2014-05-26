"use strict";
var __moduleName = "selector_extra";
var $__0 = require('./util'),
    each = $__0.each,
    toArray = $__0.toArray;
var $__0 = require('./selector'),
    $ = $__0.$,
    matches = $__0.matches;
function children(selector) {
  var nodes = [];
  each(this, function(element) {
    if (element.children) {
      each(element.children, function(child) {
        if (!selector || (selector && matches(child, selector))) {
          nodes.push(child);
        }
      });
    }
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
function contents() {
  var nodes = [];
  each(this, function(element) {
    nodes.push.apply(nodes, toArray(element.childNodes));
  });
  return $(nodes);
}
function eq(index) {
  return slice.call(this, index, index + 1);
}
function get(index) {
  return this[index];
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
function slice(start, end) {
  return $([].slice.apply(this, arguments));
}
;
module.exports = {
  get children() {
    return children;
  },
  get contents() {
    return contents;
  },
  get closest() {
    return closest;
  },
  get eq() {
    return eq;
  },
  get get() {
    return get;
  },
  get parent() {
    return parent;
  },
  get slice() {
    return slice;
  },
  __esModule: true
};

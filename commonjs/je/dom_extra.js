"use strict";
var __moduleName = "dom_extra";
var each = require('./util').each;
var $__0 = require('./dom'),
    append = $__0.append,
    before = $__0.before,
    after = $__0.after;
var $ = require('./selector').$;
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
module.exports = {
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

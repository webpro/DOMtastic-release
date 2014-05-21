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
function empty() {
  return each(this, function(element) {
    element.innerHTML = '';
  });
}
function replaceWith() {
  return before.apply(this, arguments).remove();
}
function val(value) {
  if (typeof value !== 'string') {
    return this[0].value;
  }
  each(this, function(element) {
    element.value = value;
  });
  return this;
}
function text(value) {
  if (typeof value !== 'string') {
    return this[0].textContent;
  }
  each(this, function(element) {
    element.textContent = '' + value;
  });
  return this;
}
;
module.exports = {
  get appendTo() {
    return appendTo;
  },
  get remove() {
    return remove;
  },
  get empty() {
    return empty;
  },
  get replaceWith() {
    return replaceWith;
  },
  get val() {
    return val;
  },
  get text() {
    return text;
  },
  __esModule: true
};

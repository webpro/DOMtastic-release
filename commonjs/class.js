"use strict";
var __moduleName = "class";
var $__0 = require('./util'),
    makeIterable = $__0.makeIterable,
    each = $__0.each;
function addClass(value) {
  each(this, function(element) {
    element.classList.add(value);
  });
  return this;
}
function removeClass(value) {
  each(this, function(element) {
    element.classList.remove(value);
  });
  return this;
}
function toggleClass(value) {
  each(this, function(element) {
    element.classList.toggle(value);
  });
  return this;
}
function hasClass(value) {
  return makeIterable(this).some(function(element) {
    return element.classList.contains(value);
  });
}
;
module.exports = {
  get addClass() {
    return addClass;
  },
  get removeClass() {
    return removeClass;
  },
  get toggleClass() {
    return toggleClass;
  },
  get hasClass() {
    return hasClass;
  },
  __esModule: true
};

"use strict";

var each = require("./util").each;
var toArray = require("./util").toArray;
var $ = require("./selector").$;
var matches = require("./selector").matches;


function children(selector) {
  var nodes = [];
  each(this, function (element) {
    if (element.children) {
      each(element.children, function (child) {
        if (!selector || selector && matches(child, selector)) {
          nodes.push(child);
        }
      });
    }
  });
  return $(nodes);
}

function contents() {
  var nodes = [];
  each(this, function (element) {
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
  each(this, function (element) {
    if (!selector || selector && matches(element.parentNode, selector)) {
      nodes.push(element.parentNode);
    }
  });
  return $(nodes);
}

function siblings(selector) {
  var nodes = [];
  each(this, function (element) {
    each(element.parentNode.children, function (sibling) {
      if (sibling !== element && (!selector || selector && matches(sibling, selector))) {
        nodes.push(sibling);
      }
    });
  });
  return $(nodes);
}

function slice(start, end) {
  return $([].slice.apply(this, arguments));
}

exports.children = children;
exports.contents = contents;
exports.eq = eq;
exports.get = get;
exports.parent = parent;
exports.siblings = siblings;
exports.slice = slice;
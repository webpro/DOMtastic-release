"use strict";

var global = require("./util").global;


var isPrototypeSet = false, reFragment = /^\s*<(\w+|!)[^>]*>/, reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, reSimpleSelector = /^[\.#]?[\w-]*$/;

function $(selector) {
  var context = arguments[1] === undefined ? document : arguments[1];
  return (function () {
    var collection;

    if (!selector) {
      collection = document.querySelectorAll(null);
    } else if (selector instanceof Wrapper) {
      return selector;
    } else if (typeof selector !== "string") {
      collection = selector.nodeType || selector === window ? [selector] : selector;
    } else if (reFragment.test(selector)) {
      collection = createFragment(selector);
    } else {
      context = typeof context === "string" ? document.querySelector(context) : context.length ? context[0] : context;

      collection = querySelector(selector, context);
    }

    return wrap(collection);
  })();
}

function find(selector) {
  return $(selector, this);
}

var closest = (function () {
  function closest(selector, context) {
    var node = this[0];
    while (node && node !== context) {
      if (matches(node, selector)) {
        return $(node);
      } else {
        node = node.parentElement;
      }
    }
    return $();
  }

  return !Element.prototype.closest ? closest : function (selector, context) {
    if (!context) {
      var node = this[0];
      return $(node.closest(selector));
    } else {
      return closest.call(this, selector, context);
    }
  };
})();

var matches = (function () {
  var context = typeof Element !== "undefined" ? Element.prototype : global, _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector;
  return function (element, selector) {
    return _matches.call(element, selector);
  };
})();

function querySelector(selector, context) {
  var isSimpleSelector = reSimpleSelector.test(selector);

  if (isSimpleSelector) {
    if (selector[0] === "#") {
      var element = (context.getElementById ? context : document).getElementById(selector.slice(1));
      return element ? [element] : [];
    }
    if (selector[0] === ".") {
      return context.getElementsByClassName(selector.slice(1));
    }
    return context.getElementsByTagName(selector);
  }

  return context.querySelectorAll(selector);
}

function createFragment(html) {
  if (reSingleTag.test(html)) {
    return [document.createElement(RegExp.$1)];
  }

  var elements = [], container = document.createElement("div"), children = container.childNodes;

  container.innerHTML = html;

  for (var i = 0, l = children.length; i < l; i++) {
    elements.push(children[i]);
  }

  return elements;
}

function wrap(collection) {
  if (!isPrototypeSet) {
    Wrapper.prototype = $.fn;
    Wrapper.prototype.constructor = Wrapper;
    isPrototypeSet = true;
  }

  return new Wrapper(collection);
}

function Wrapper(collection) {
  var i = 0, length = collection.length;
  for (; i < length;) {
    this[i] = collection[i++];
  }
  this.length = length;
}

exports.$ = $;
exports.find = find;
exports.closest = closest;
exports.matches = matches;
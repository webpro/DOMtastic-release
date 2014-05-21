define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "selector";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var $__1 = $__0,
      global = $__1.global,
      makeIterable = $__1.makeIterable;
  var slice = [].slice,
      isPrototypeSet = false,
      reFragment = /^\s*<(\w+|!)[^>]*>/,
      reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
      reSimpleSelector = /^[\.#]?[\w-]*$/;
  function $(selector) {
    var context = arguments[1] !== (void 0) ? arguments[1] : document;
    var collection;
    if (!selector) {
      collection = document.querySelectorAll(null);
    } else if (selector instanceof Wrapper) {
      return selector;
    } else if (typeof selector !== 'string') {
      collection = makeIterable(selector);
    } else if (reFragment.test(selector)) {
      collection = createFragment(selector);
    } else {
      context = typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context;
      collection = querySelector(selector, context);
    }
    return $.isNative ? collection : wrap(collection);
  }
  function find(selector) {
    return $(selector, this);
  }
  var matches = (function() {
    var context = typeof Element !== 'undefined' ? Element.prototype : global,
        _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.webkitMatchesSelector || context.msMatchesSelector || context.oMatchesSelector;
    return function(element, selector) {
      return _matches.call(element, selector);
    };
  })();
  function querySelector(selector, context) {
    var isSimpleSelector = reSimpleSelector.test(selector);
    if (isSimpleSelector && !$.isNative) {
      if (selector[0] === '#') {
        var element = (context.getElementById ? context : document).getElementById(selector.slice(1));
        return element ? [element] : [];
      }
      if (selector[0] === '.') {
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
    var elements = [],
        container = document.createElement('div'),
        children = container.childNodes;
    container.innerHTML = html;
    for (var i = 0,
        l = children.length; i < l; i++) {
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
    var i = 0,
        length = collection.length;
    for (; i < length; ) {
      this[i] = collection[i++];
    }
    this.length = length;
  }
  ;
  return {
    get $() {
      return $;
    },
    get find() {
      return find;
    },
    get matches() {
      return matches;
    },
    __esModule: true
  };
});

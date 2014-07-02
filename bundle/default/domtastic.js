!function(_e){var e=function(){return _e()["default"]};if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.$=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/api";
var extend = _dereq_('./util').extend;
var api = {},
    apiNodeList = {},
    $ = {};
var array = _dereq_('./array');
var attr = _dereq_('./attr');
var class_ = _dereq_('./class');
var contains = _dereq_('./contains');
var dom = _dereq_('./dom');
var event = _dereq_('./event');
var html = _dereq_('./html');
var noconflict = _dereq_('./noconflict');
var ready = _dereq_('./ready');
var selector = _dereq_('./selector');
if (typeof selector !== 'undefined') {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
  api.closest = selector.closest;
}
extend($, contains, noconflict);
extend(api, array, attr, class_, dom, event, html, ready);
extend(apiNodeList, array);
$.version = '0.7.5';
$.extend = extend;
$.fn = api;
$.fnList = apiNodeList;
var $__default = $;
module.exports = {
  default: $__default,
  __esModule: true
};


},{"./array":2,"./attr":3,"./class":4,"./contains":5,"./dom":6,"./event":7,"./html":8,"./noconflict":10,"./ready":11,"./selector":12,"./util":13}],2:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/array";
var _each = _dereq_('./util').each;
var $__0 = _dereq_('./selector'),
    $ = $__0.$,
    matches = $__0.matches;
var ArrayProto = Array.prototype;
var every = ArrayProto.every;
function filter(selector, thisArg) {
  var callback = typeof selector === 'function' ? selector : function(element) {
    return matches(element, selector);
  };
  return $(ArrayProto.filter.call(this, callback, thisArg));
}
function forEach(callback, thisArg) {
  return _each(this, callback, thisArg);
}
var each = forEach;
var indexOf = ArrayProto.indexOf;
var map = ArrayProto.map;
var pop = ArrayProto.pop;
var push = ArrayProto.push;
function reverse() {
  var elements = ArrayProto.slice.call(this);
  return $(ArrayProto.reverse.call(elements));
}
var shift = ArrayProto.shift;
var some = ArrayProto.some;
var unshift = ArrayProto.unshift;
;
module.exports = {
  each: each,
  every: every,
  filter: filter,
  forEach: forEach,
  indexOf: indexOf,
  map: map,
  pop: pop,
  push: push,
  reverse: reverse,
  shift: shift,
  some: some,
  unshift: unshift,
  __esModule: true
};


},{"./selector":12,"./util":13}],3:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/attr";
var each = _dereq_('./util').each;
function attr(key, value) {
  if (typeof key === 'string' && typeof value === 'undefined') {
    var element = this.nodeType ? this : this[0];
    return element ? element.getAttribute(key) : undefined;
  }
  each(this, function(element) {
    if (typeof key === 'object') {
      for (var attr in key) {
        element.setAttribute(attr, key[attr]);
      }
    } else {
      element.setAttribute(key, value);
    }
  });
  return this;
}
function removeAttr(key) {
  each(this, function(element) {
    element.removeAttribute(key);
  });
  return this;
}
;
module.exports = {
  attr: attr,
  removeAttr: removeAttr,
  __esModule: true
};


},{"./util":13}],4:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/class";
var $__0 = _dereq_('./util'),
    makeIterable = $__0.makeIterable,
    each = $__0.each;
function addClass(value) {
  if (value && value.length) {
    each(value.split(' '), function(className) {
      each(this, function(element) {
        element.classList.add(className);
      });
    }.bind(this));
  }
  return this;
}
function removeClass(value) {
  if (value && value.length) {
    each(value.split(' '), function(className) {
      each(this, function(element) {
        element.classList.remove(className);
      });
    }.bind(this));
  }
  return this;
}
function toggleClass(value) {
  if (value && value.length) {
    each(value.split(' '), function(className) {
      each(this, function(element) {
        element.classList.toggle(className);
      });
    }.bind(this));
  }
  return this;
}
function hasClass(value) {
  return makeIterable(this).some(function(element) {
    return element.classList.contains(value);
  });
}
;
module.exports = {
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  hasClass: hasClass,
  __esModule: true
};


},{"./util":13}],5:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/contains";
function contains(container, element) {
  if (!container || !element || container === element) {
    return false;
  } else if (container.contains) {
    return container.contains(element);
  } else if (container.compareDocumentPosition) {
    return !(container.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
  }
  return false;
}
;
module.exports = {
  contains: contains,
  __esModule: true
};


},{}],6:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/dom";
var toArray = _dereq_('./util').toArray;
function append(element) {
  if (this instanceof Node) {
    if (typeof element === 'string') {
      this.insertAdjacentHTML('beforeend', element);
    } else {
      if (element instanceof Node) {
        this.appendChild(element);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.forEach(this.appendChild.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      append.call(this[l], elm);
    }
  }
  return this;
}
function prepend(element) {
  if (this instanceof Node) {
    if (typeof element === 'string') {
      this.insertAdjacentHTML('afterbegin', element);
    } else {
      if (element instanceof Node) {
        this.insertBefore(element, this.firstChild);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.reverse().forEach(prepend.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      prepend.call(this[l], elm);
    }
  }
  return this;
}
function before(element) {
  if (this instanceof Node) {
    if (typeof element === 'string') {
      this.insertAdjacentHTML('beforebegin', element);
    } else {
      if (element instanceof Node) {
        this.parentNode.insertBefore(element, this);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.forEach(before.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      before.call(this[l], elm);
    }
  }
  return this;
}
function after(element) {
  if (this instanceof Node) {
    if (typeof element === 'string') {
      this.insertAdjacentHTML('afterend', element);
    } else {
      if (element instanceof Node) {
        this.parentNode.insertBefore(element, this.nextSibling);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.reverse().forEach(after.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      after.call(this[l], elm);
    }
  }
  return this;
}
function clone() {
  return $(_clone(this));
}
function _clone(element) {
  if (typeof element === 'string') {
    return element;
  } else if (element instanceof Node) {
    return element.cloneNode(true);
  } else if ('length' in element) {
    return [].map.call(element, function(el) {
      return el.cloneNode(true);
    });
  }
  return element;
}
;
module.exports = {
  append: append,
  prepend: prepend,
  before: before,
  after: after,
  clone: clone,
  __esModule: true
};


},{"./util":13}],7:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/event";
var $__0 = _dereq_('./util'),
    global = $__0.global,
    each = $__0.each;
var closest = _dereq_('./selector').closest;
function on(eventNames, selector, handler, useCapture) {
  if (typeof selector === 'function') {
    handler = selector;
    selector = null;
  }
  var parts,
      namespace,
      eventListener;
  eventNames.split(' ').forEach(function(eventName) {
    parts = eventName.split('.');
    eventName = parts[0] || null;
    namespace = parts[1] || null;
    eventListener = proxyHandler(handler);
    each(this, function(element) {
      if (selector && eventName in hoverEvents) {
        eventListener = hoverHandler(eventListener);
      }
      if (selector) {
        eventListener = delegateHandler.bind(element, selector, eventListener);
      }
      element.addEventListener(hoverEvents[eventName] || eventName, eventListener, useCapture || false);
      getHandlers(element).push({
        eventName: eventName,
        handler: handler,
        eventListener: eventListener,
        selector: selector,
        namespace: namespace
      });
    });
  }, this);
  return this;
}
function off() {
  var eventNames = arguments[0] !== (void 0) ? arguments[0] : '';
  var selector = arguments[1];
  var handler = arguments[2];
  var useCapture = arguments[3];
  if (typeof selector === 'function') {
    handler = selector;
    selector = null;
  }
  var parts,
      namespace,
      handlers;
  eventNames.split(' ').forEach(function(eventName) {
    parts = eventName.split('.');
    eventName = parts[0] || null;
    namespace = parts[1] || null;
    each(this, function(element) {
      handlers = getHandlers(element);
      each(handlers.filter(function(item) {
        return ((!eventName || item.eventName === eventName) && (!namespace || item.namespace === namespace) && (!handler || item.handler === handler) && (!selector || item.selector === selector));
      }), function(item) {
        element.removeEventListener(hoverEvents[item.eventName] || item.eventName, item.eventListener, useCapture || false);
        handlers.splice(handlers.indexOf(item), 1);
      });
      if (!eventName && !namespace && !selector && !handler) {
        clearHandlers(element);
      } else if (handlers.length === 0) {
        clearHandlers(element);
      }
    });
  }, this);
  return this;
}
function delegate(selector, eventName, handler) {
  return on.call(this, eventName, selector, handler);
}
function undelegate(selector, eventName, handler) {
  return off.call(this, eventName, selector, handler);
}
function trigger(type) {
  var params = arguments[2] !== (void 0) ? arguments[2] : {};
  params.bubbles = typeof params.bubbles === 'boolean' ? params.bubbles : true;
  params.cancelable = typeof params.cancelable === 'boolean' ? params.cancelable : true;
  params.preventDefault = typeof params.preventDefault === 'boolean' ? params.preventDefault : false;
  params.detail = data;
  var event = new CustomEvent(type, params);
  event._preventDefault = params.preventDefault;
  each(this, function(element) {
    if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
      dispatchEvent(element, event);
    } else {
      triggerForPath(element, params);
    }
  });
  return this;
}
function triggerHandler(type) {
  if (this[0]) {
    trigger.call(this[0], {
      bubbles: false,
      preventDefault: true
    });
  }
}
function isAttachedToDocument(element) {
  if (element === window || element === document) {
    return true;
  }
  return $.contains(element.ownerDocument.documentElement, element);
}
function triggerForPath(element) {
  var params = arguments[2] !== (void 0) ? arguments[2] : {};
  params.bubbles = false;
  var event = new CustomEvent(type, params);
  event._target = element;
  do {
    dispatchEvent(element, event);
  } while (element = element.parentNode);
}
var directEventMethods = ['blur', 'click', 'focus', 'select'];
function dispatchEvent(element, event) {
  if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === 'function') {
    element[event.type]();
  } else {
    element.dispatchEvent(event);
  }
}
var eventKeyProp = '__domtastic_event__';
var id = 1;
var handlers = {};
var unusedKeys = [];
function getHandlers(element) {
  if (!element[eventKeyProp]) {
    element[eventKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
  }
  var key = element[eventKeyProp];
  return handlers[key] || (handlers[key] = []);
}
function clearHandlers(element) {
  var key = element[eventKeyProp];
  if (handlers[key]) {
    handlers[key] = null;
    element[key] = null;
    unusedKeys.push(key);
  }
}
function proxyHandler(handler) {
  return function(event) {
    handler.call(this, augmentEvent(event), event.detail);
  };
}
var augmentEvent = (function() {
  var methodName,
      eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
      },
      noop = (function() {}),
      returnTrue = (function() {
        return true;
      }),
      returnFalse = (function() {
        return false;
      });
  return function(event) {
    if (!event.isDefaultPrevented || event.stopImmediatePropagation || event.stopPropagation) {
      for (methodName in eventMethods) {
        (function(methodName, testMethodName, originalMethod) {
          event[methodName] = function() {
            this[testMethodName] = returnTrue;
            return originalMethod.apply(this, arguments);
          };
          event[testMethodName] = returnFalse;
        }(methodName, eventMethods[methodName], event[methodName] || noop));
      }
      if (event._preventDefault) {
        event.preventDefault();
      }
    }
    return event;
  };
})();
function delegateHandler(selector, handler, event) {
  var eventTarget = event._target || event.target,
      currentTarget = closest.call([eventTarget], selector, this)[0];
  if (currentTarget && currentTarget !== this) {
    if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
      handler.call(currentTarget, event);
    }
  }
}
var hoverEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
function hoverHandler(handler) {
  return function(event) {
    var relatedTarget = event.relatedTarget;
    if (!relatedTarget || (relatedTarget !== this && !$.contains(this, relatedTarget))) {
      return handler.apply(this, arguments);
    }
  };
}
(function() {
  function CustomEvent(event) {
    var params = arguments[1] !== (void 0) ? arguments[1] : {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var customEvent = document.createEvent('CustomEvent');
    customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return customEvent;
  }
  CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
  global.CustomEvent = CustomEvent;
})();
var isEventBubblingInDetachedTree = (function() {
  var isBubbling = false,
      doc = global.document;
  if (doc) {
    var parent = doc.createElement('div'),
        child = parent.cloneNode();
    parent.appendChild(child);
    parent.addEventListener('e', function() {
      isBubbling = true;
    });
    child.dispatchEvent(new CustomEvent('e', {bubbles: true}));
  }
  return isBubbling;
})();
var bind = on,
    unbind = off;
;
module.exports = {
  on: on,
  off: off,
  delegate: delegate,
  undelegate: undelegate,
  trigger: trigger,
  triggerHandler: triggerHandler,
  bind: bind,
  unbind: unbind,
  __esModule: true
};


},{"./selector":12,"./util":13}],8:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/html";
var each = _dereq_('./util').each;
function html(fragment) {
  if (typeof fragment !== 'string') {
    var element = this.nodeType ? this : this[0];
    return element ? element.innerHTML : undefined;
  }
  each(this, function(element) {
    element.innerHTML = fragment;
  });
  return this;
}
;
module.exports = {
  html: html,
  __esModule: true
};


},{"./util":13}],9:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/index";
var $ = _dereq_('./api').default;
var $__default = $;
module.exports = {
  default: $__default,
  __esModule: true
};


},{"./api":1}],10:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/noconflict";
var global = _dereq_('./util').global;
var previousLib = global.$;
function noConflict() {
  global.$ = previousLib;
  return this;
}
;
module.exports = {
  noConflict: noConflict,
  __esModule: true
};


},{"./util":13}],11:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/ready";
function ready(handler) {
  if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler, false);
  }
  return this;
}
;
module.exports = {
  ready: ready,
  __esModule: true
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/selector";
var $__0 = _dereq_('./util'),
    global = $__0.global,
    makeIterable = $__0.makeIterable;
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
function closest(selector, context) {
  var node = this[0];
  for (; node.nodeType !== node.DOCUMENT_NODE && node !== context; node = node.parentNode) {
    if (matches(node, selector)) {
      return $(node);
    }
  }
  return $();
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
module.exports = {
  $: $,
  find: find,
  closest: closest,
  matches: matches,
  __esModule: true
};


},{"./util":13}],13:[function(_dereq_,module,exports){
"use strict";
var __moduleName = "src/util";
var global = new Function("return this")(),
    slice = Array.prototype.slice;
var toArray = (function(collection) {
  return slice.call(collection);
});
var makeIterable = (function(element) {
  return element.nodeType || element === window ? [element] : element;
});
function each(collection, callback, thisArg) {
  var length = collection.length;
  if (length !== undefined && collection.nodeType === undefined) {
    for (var i = 0; i < length; i++) {
      callback.call(thisArg, collection[i], i, collection);
    }
  } else {
    callback.call(thisArg, collection, 0, collection);
  }
  return collection;
}
function extend(target) {
  for (var sources = [],
      $__0 = 1; $__0 < arguments.length; $__0++)
    sources[$__0 - 1] = arguments[$__0];
  sources.forEach(function(src) {
    if (src) {
      for (var prop in src) {
        target[prop] = src[prop];
      }
    }
  });
  return target;
}
;
module.exports = {
  global: global,
  toArray: toArray,
  makeIterable: makeIterable,
  each: each,
  extend: extend,
  __esModule: true
};


},{}]},{},[9])
(9)
});
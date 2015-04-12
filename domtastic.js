(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$ = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _each$toArray = require(18);

var _$$matches = require(16);

var ArrayProto = Array.prototype;

var every = ArrayProto.every;

function filter(selector, thisArg) {
  var callback = typeof selector === 'function' ? selector : function (element) {
    return _$$matches.matches(element, selector);
  };
  return _$$matches.$(ArrayProto.filter.call(this, callback, thisArg));
}

function forEach(callback, thisArg) {
  return _each$toArray.each(this, callback, thisArg);
}

var each = forEach;

var indexOf = ArrayProto.indexOf;

var map = ArrayProto.map;

var pop = ArrayProto.pop;

var push = ArrayProto.push;

var reduce = ArrayProto.reduce;

var reduceRight = ArrayProto.reduceRight;

function reverse() {
  return _$$matches.$(_each$toArray.toArray(this).reverse());
}

var shift = ArrayProto.shift;

var some = ArrayProto.some;

var unshift = ArrayProto.unshift;

exports.each = each;
exports.every = every;
exports.filter = filter;
exports.forEach = forEach;
exports.indexOf = indexOf;
exports.map = map;
exports.pop = pop;
exports.push = push;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.reverse = reverse;
exports.shift = shift;
exports.some = some;
exports.unshift = unshift;

},{"16":16,"18":18}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each = require(18);

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function camelize(value) {
    return value.replace(/-([\da-z])/gi, function (matches, letter) {
        return letter.toUpperCase();
    });
}

function dasherize(value) {
    return value.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}

function css(key, value) {

    var styleProps, prop, val;

    if (typeof key === 'string') {
        key = camelize(key);

        if (typeof value === 'undefined') {
            var element = this.nodeType ? this : this[0];
            if (element) {
                val = element.style[key];
                return isNumeric(val) ? parseFloat(val) : val;
            }
            return undefined;
        }

        styleProps = {};
        styleProps[key] = value;
    } else {
        styleProps = key;
        for (prop in styleProps) {
            val = styleProps[prop];
            delete styleProps[prop];
            styleProps[camelize(prop)] = val;
        }
    }

    _each.each(this, function (element) {
        for (prop in styleProps) {
            if (styleProps[prop] || styleProps[prop] === 0) {
                element.style[prop] = styleProps[prop];
            } else {
                element.style.removeProperty(dasherize(prop));
            }
        }
    });

    return this;
}

exports.css = css;

},{"18":18}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each = require(18);

function attr(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element ? element.getAttribute(key) : undefined;
    }

    _each.each(this, function (element) {
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
    _each.each(this, function (element) {
        element.removeAttribute(key);
    });
    return this;
}

exports.attr = attr;
exports.removeAttr = removeAttr;

},{"18":18}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each2 = require(18);

function addClass(value) {
    if (value && value.length) {
        _each2.each(value.split(' '), _each.bind(this, 'add'));
    }
    return this;
}

function removeClass(value) {
    if (value && value.length) {
        _each2.each(value.split(' '), _each.bind(this, 'remove'));
    }
    return this;
}

function toggleClass(value) {
    if (value && value.length) {
        _each2.each(value.split(' '), _each.bind(this, 'toggle'));
    }
    return this;
}

function hasClass(value) {
    return (this.nodeType ? [this] : this).some(function (element) {
        return element.classList.contains(value);
    });
}

function _each(fnName, className) {
    _each2.each(this, function (element) {
        element.classList[fnName](className);
    });
}

exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;

},{"18":18}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.contains = contains;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each = require(18);

var dataKeyProp = '__domtastic_data__';

function data(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element && element[dataKeyProp] ? element[dataKeyProp][key] : undefined;
    }

    _each.each(this, function (element) {
        element[dataKeyProp] = element[dataKeyProp] || {};
        element[dataKeyProp][key] = value;
    });

    return this;
}

function prop(key, value) {

    if (typeof key === 'string' && typeof value === 'undefined') {
        var element = this.nodeType ? this : this[0];
        return element && element ? element[key] : undefined;
    }

    _each.each(this, function (element) {
        element[key] = value;
    });

    return this;
}

exports.data = data;
exports.prop = prop;

},{"18":18}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each = require(18);

var _append$before$after = require(9);

var _$ = require(16);

function appendTo(element) {
    var context = typeof element === 'string' ? _$.$(element) : element;
    _append$before$after.append.call(context, this);
    return this;
}

function empty() {
    return _each.each(this, function (element) {
        element.innerHTML = '';
    });
}

function remove() {
    return _each.each(this, function (element) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
}

function replaceWith() {
    return _append$before$after.before.apply(this, arguments).remove();
}

function text(value) {

    if (value === undefined) {
        return this[0].textContent;
    }

    _each.each(this, function (element) {
        element.textContent = '' + value;
    });

    return this;
}

function val(value) {

    if (value === undefined) {
        return this[0].value;
    }

    _each.each(this, function (element) {
        element.value = value;
    });

    return this;
}

exports.appendTo = appendTo;
exports.empty = empty;
exports.remove = remove;
exports.replaceWith = replaceWith;
exports.text = text;
exports.val = val;

},{"16":16,"18":18,"9":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _each = require(18);

function html(fragment) {

  if (typeof fragment !== 'string') {
    var element = this.nodeType ? this : this[0];
    return element ? element.innerHTML : undefined;
  }

  _each.each(this, function (element) {
    element.innerHTML = fragment;
  });

  return this;
}

exports.html = html;

},{"18":18}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _toArray = require(18);

var _$ = require(16);

var forEach = Array.prototype.forEach;

function append(element) {
    if (this instanceof Node) {
        if (typeof element === 'string') {
            this.insertAdjacentHTML('beforeend', element);
        } else {
            if (element instanceof Node) {
                this.appendChild(element);
            } else {
                var elements = element instanceof NodeList ? _toArray.toArray(element) : element;
                forEach.call(elements, this.appendChild.bind(this));
            }
        }
    } else {
        _each(this, append, element);
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
                var elements = element instanceof NodeList ? _toArray.toArray(element) : element;
                forEach.call(elements.reverse(), prepend.bind(this));
            }
        }
    } else {
        _each(this, prepend, element);
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
                var elements = element instanceof NodeList ? _toArray.toArray(element) : element;
                forEach.call(elements, before.bind(this));
            }
        }
    } else {
        _each(this, before, element);
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
                var elements = element instanceof NodeList ? _toArray.toArray(element) : element;
                forEach.call(elements.reverse(), after.bind(this));
            }
        }
    } else {
        _each(this, after, element);
    }
    return this;
}

function clone() {
    return _$.$(_clone(this));
}

function _clone(element) {
    if (typeof element === 'string') {
        return element;
    } else if (element instanceof Node) {
        return element.cloneNode(true);
    } else if ('length' in element) {
        return [].map.call(element, function (el) {
            return el.cloneNode(true);
        });
    }
    return element;
}

function _each(collection, fn, element) {
    var l = collection.length;
    while (l--) {
        var elm = l === 0 ? element : _clone(element);
        fn.call(collection[l], elm);
    }
}

exports.append = append;
exports.prepend = prepend;
exports.before = before;
exports.after = after;
exports.clone = clone;

},{"16":16,"18":18}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each = require(18);

var _closest = require(14);

function on(eventNames, selector, handler, useCapture) {

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts, namespace, eventListener;

    eventNames.split(' ').forEach(function (eventName) {

        parts = eventName.split('.');
        eventName = parts[0] || null;
        namespace = parts[1] || null;

        eventListener = proxyHandler(handler);

        _each.each(this, function (element) {

            if (selector) {
                eventListener = delegateHandler.bind(element, selector, eventListener);
            }

            element.addEventListener(eventName, eventListener, useCapture || false);

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

function off(_x, selector, handler, useCapture) {
    var eventNames = arguments[0] === undefined ? '' : arguments[0];

    if (typeof selector === 'function') {
        handler = selector;
        selector = null;
    }

    var parts, namespace, handlers;

    eventNames.split(' ').forEach(function (eventName) {

        parts = eventName.split('.');
        eventName = parts[0] || null;
        namespace = parts[1] || null;

        _each.each(this, function (element) {

            handlers = getHandlers(element);

            _each.each(handlers.filter(function (item) {
                return (!eventName || item.eventName === eventName) && (!namespace || item.namespace === namespace) && (!handler || item.handler === handler) && (!selector || item.selector === selector);
            }), function (item) {
                element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
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
    return function (event) {
        handler.call(this, augmentEvent(event), event.detail);
    };
}

var augmentEvent = (function () {

    var methodName,
        eventMethods = {
        preventDefault: 'isDefaultPrevented',
        stopImmediatePropagation: 'isImmediatePropagationStopped',
        stopPropagation: 'isPropagationStopped'
    },
        returnTrue = function returnTrue() {
        return true;
    },
        returnFalse = function returnFalse() {
        return false;
    };

    return function (event) {
        if (!event.isDefaultPrevented || event.stopImmediatePropagation || event.stopPropagation) {
            for (methodName in eventMethods) {
                (function (methodName, testMethodName, originalMethod) {
                    event[methodName] = function () {
                        this[testMethodName] = returnTrue;
                        return originalMethod && originalMethod.apply(this, arguments);
                    };
                    event[testMethodName] = returnFalse;
                })(methodName, eventMethods[methodName], event[methodName]);
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
        currentTarget = _closest.closest.call([eventTarget], selector, this)[0];
    if (currentTarget && currentTarget !== this) {
        if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
            handler.call(currentTarget, event);
        }
    }
}

var bind = on,
    unbind = off;

exports.on = on;
exports.off = off;
exports.bind = bind;
exports.unbind = unbind;

},{"14":14,"18":18}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function ready(handler) {
  if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
    handler();
  } else {
    document.addEventListener('DOMContentLoaded', handler, false);
  }
  return this;
}

exports.ready = ready;

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _global$each = require(18);

var _contains = require(5);

var reMouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
    reKeyEvent = /^key/;

function trigger(type, data) {
    var params = arguments[2] === undefined ? {} : arguments[2];

    params.bubbles = typeof params.bubbles === 'boolean' ? params.bubbles : true;
    params.cancelable = typeof params.cancelable === 'boolean' ? params.cancelable : true;
    params.preventDefault = typeof params.preventDefault === 'boolean' ? params.preventDefault : false;
    params.detail = data;

    var EventConstructor = getEventConstructor(type),
        event = new EventConstructor(type, params);

    event._preventDefault = params.preventDefault;

    _global$each.each(this, function (element) {
        if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
            dispatchEvent(element, event);
        } else {
            triggerForPath(element, type, params);
        }
    });
    return this;
}

function getEventConstructor(type) {
    return supportsOtherEventConstructors ? reMouseEvent.test(type) ? MouseEvent : reKeyEvent.test(type) ? KeyboardEvent : CustomEvent : CustomEvent;
}

function triggerHandler(type, data) {
    if (this[0]) {
        trigger.call(this[0], type, data, { bubbles: false, preventDefault: true });
    }
}

function isAttachedToDocument(element) {
    if (element === window || element === document) {
        return true;
    }
    return _contains.contains(element.ownerDocument.documentElement, element);
}

function triggerForPath(element, type) {
    var params = arguments[2] === undefined ? {} : arguments[2];

    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    do {
        dispatchEvent(element, event);
    } while (element = element.parentNode);
}

var directEventMethods = ['blur', 'focus', 'select', 'submit'];

function dispatchEvent(element, event) {
    if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === 'function' && !event._preventDefault && !event.cancelable) {
        element[event.type]();
    } else {
        element.dispatchEvent(event);
    }
}

(function () {
    function CustomEvent(event) {
        var params = arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: undefined } : arguments[1];

        var customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return customEvent;
    }

    CustomEvent.prototype = _global$each.global.CustomEvent && _global$each.global.CustomEvent.prototype;
    _global$each.global.CustomEvent = CustomEvent;
})();

var isEventBubblingInDetachedTree = (function () {
    var isBubbling = false,
        doc = _global$each.global.document;
    if (doc) {
        var parent = doc.createElement('div'),
            child = parent.cloneNode();
        parent.appendChild(child);
        parent.addEventListener('e', function () {
            isBubbling = true;
        });
        child.dispatchEvent(new CustomEvent('e', { bubbles: true }));
    }
    return isBubbling;
})();

var supportsOtherEventConstructors = (function () {
    try {
        new window.MouseEvent('click');
    } catch (e) {
        return false;
    }
    return true;
})();

exports.trigger = trigger;
exports.triggerHandler = triggerHandler;

},{"18":18,"5":5}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _global = require(18);

var previousLib = _global.global.$;

function noConflict() {
  _global.global.$ = previousLib;
  return this;
}

exports.noConflict = noConflict;

},{"18":18}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _$$matches = require(16);

var _each$uniq = require(18);

var closest = (function () {

    function closest(selector, context) {
        var nodes = [];
        _each$uniq.each(this, function (node) {
            while (node && node !== context) {
                if (_$$matches.matches(node, selector)) {
                    nodes.push(node);
                    break;
                }
                node = node.parentElement;
            }
        });
        return _$$matches.$(_each$uniq.uniq(nodes));
    }

    return !Element.prototype.closest ? closest : function (selector, context) {
        if (!context) {
            var nodes = [];
            _each$uniq.each(this, function (node) {
                var n = node.closest(selector);
                if (n) {
                    nodes.push(n);
                }
            });
            return _$$matches.$(_each$uniq.uniq(nodes));
        } else {
            return closest.call(this, selector, context);
        }
    };
})();

exports.closest = closest;

},{"16":16,"18":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _each$toArray = require(18);

var _$$matches = require(16);

function children(selector) {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        if (element.children) {
            _each$toArray.each(element.children, function (child) {
                if (!selector || selector && _$$matches.matches(child, selector)) {
                    nodes.push(child);
                }
            });
        }
    });
    return _$$matches.$(nodes);
}

function contents() {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        nodes.push.apply(nodes, _each$toArray.toArray(element.childNodes));
    });
    return _$$matches.$(nodes);
}

function eq(index) {
    return slice.call(this, index, index + 1);
}

function get(index) {
    return this[index];
}

function parent(selector) {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        if (!selector || selector && _$$matches.matches(element.parentNode, selector)) {
            nodes.push(element.parentNode);
        }
    });
    return _$$matches.$(nodes);
}

function siblings(selector) {
    var nodes = [];
    _each$toArray.each(this, function (element) {
        _each$toArray.each(element.parentNode.children, function (sibling) {
            if (sibling !== element && (!selector || selector && _$$matches.matches(sibling, selector))) {
                nodes.push(sibling);
            }
        });
    });
    return _$$matches.$(nodes);
}

function slice(start, end) {
    return _$$matches.$([].slice.apply(this, arguments));
}

exports.children = children;
exports.contents = contents;
exports.eq = eq;
exports.get = get;
exports.parent = parent;
exports.siblings = siblings;
exports.slice = slice;

},{"16":16,"18":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _global$each = require(18);

var isPrototypeSet = false,
    reFragment = /^\s*<(\w+|!)[^>]*>/,
    reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    reSimpleSelector = /^[\.#]?[\w-]*$/;

function $(selector) {
    var context = arguments[1] === undefined ? document : arguments[1];

    var collection;

    if (!selector) {

        collection = document.querySelectorAll(null);
    } else if (selector instanceof Wrapper) {

        return selector;
    } else if (typeof selector !== 'string') {

        collection = selector.nodeType || selector === window ? [selector] : selector;
    } else if (reFragment.test(selector)) {

        collection = createFragment(selector);
    } else {

        context = typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context;

        collection = querySelector(selector, context);
    }

    return wrap(collection);
}

function find(selector) {
    var nodes = [];
    _global$each.each(this, function (node) {
        _global$each.each(querySelector(selector, node), function (child) {
            if (nodes.indexOf(child) === -1) {
                nodes.push(child);
            }
        });
    });
    return $(nodes);
}

var matches = (function () {
    var context = typeof Element !== 'undefined' ? Element.prototype : _global$each.global,
        _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector;
    return function (element, selector) {
        return _matches.call(element, selector);
    };
})();

function querySelector(selector, context) {

    var isSimpleSelector = reSimpleSelector.test(selector);

    if (isSimpleSelector) {
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
    var i = 0,
        length = collection.length;
    for (; i < length;) {
        this[i] = collection[i++];
    }
    this.length = length;
}

exports.$ = $;
exports.find = find;
exports.matches = matches;

},{"18":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function isFunction(obj) {
  return typeof obj === 'function';
}

var isArray = Array.isArray;

exports.isArray = isArray;
exports.isFunction = isFunction;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var global = new Function("return this")();

function toArray(collection) {
    var length = collection.length,
        result = new Array(length);
    for (var i = 0; i < length; i++) {
        result[i] = collection[i];
    }
    return result;
}

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
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    sources.forEach(function (src) {
        for (var prop in src) {
            target[prop] = src[prop];
        }
    });
    return target;
}

function uniq(collection) {
    return collection.filter(function (item, index) {
        return collection.indexOf(item) === index;
    });
}

exports.global = global;
exports.toArray = toArray;
exports.each = each;
exports.extend = extend;
exports.uniq = uniq;

},{}],19:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extend = require(18);

var _import = require(1);

var array = _interopRequireWildcard(_import);

var _import2 = require(3);

var attr = _interopRequireWildcard(_import2);

var _import3 = require(4);

var class_ = _interopRequireWildcard(_import3);

var _import4 = require(5);

var contains = _interopRequireWildcard(_import4);

var _import5 = require(2);

var css = _interopRequireWildcard(_import5);

var _import6 = require(6);

var data = _interopRequireWildcard(_import6);

var _import7 = require(9);

var dom = _interopRequireWildcard(_import7);

var _import8 = require(7);

var dom_extra = _interopRequireWildcard(_import8);

var _import9 = require(10);

var event = _interopRequireWildcard(_import9);

var _import10 = require(8);

var html = _interopRequireWildcard(_import10);

var _import11 = require(13);

var noconflict = _interopRequireWildcard(_import11);

var _import12 = require(11);

var ready = _interopRequireWildcard(_import12);

var _import13 = require(16);

var selector = _interopRequireWildcard(_import13);

var _import14 = require(14);

var closest = _interopRequireWildcard(_import14);

var _import15 = require(15);

var selector_extra = _interopRequireWildcard(_import15);

var _import16 = require(12);

var trigger = _interopRequireWildcard(_import16);

var _import17 = require(17);

var type = _interopRequireWildcard(_import17);

var api = {},
    $ = {};

if (typeof selector !== 'undefined') {
    $ = selector.$;
    $.matches = selector.matches;
    api.find = selector.find;
}

_extend.extend($, contains, noconflict, type);
_extend.extend(api, array, attr, class_, closest, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);

$.fn = api;

$.version = '0.10.2';

$.extend = _extend.extend;

exports['default'] = $;
module.exports = exports['default'];

},{"1":1,"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9}]},{},[19])(19)
});


//# sourceMappingURL=domtastic.js.map
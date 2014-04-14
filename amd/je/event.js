define(['./util', './selector'], function($__0,$__1) {
  "use strict";
  var __moduleName = "event";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  if (!$__1 || !$__1.__esModule)
    $__1 = {'default': $__1};
  var $__2 = $__0,
      global = $__2.global,
      each = $__2.each;
  var matches = ($__1).matches;
  function on(eventName, selector, handler, useCapture) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }
    var parts = eventName.split('.');
    eventName = parts[0] || null;
    var namespace = parts[1] || null;
    var eventListener = handler;
    each(this, function(element) {
      if (selector) {
        eventListener = delegateHandler.bind(element, selector, handler);
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
    return this;
  }
  function off(eventName, selector, handler, useCapture) {
    if (typeof selector === 'function') {
      handler = selector;
      selector = null;
    }
    if (eventName) {
      var parts = eventName.split('.');
      eventName = parts[0];
      var namespace = parts[1];
    }
    each(this, function(element) {
      var handlers = getHandlers(element);
      if (!eventName && !namespace && !selector && !handler) {
        each(handlers, function(item) {
          element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
        });
        clearHandlers(element);
      } else {
        each(handlers.filter(function(item) {
          return ((!eventName || item.eventName === eventName) && (!namespace || item.namespace === namespace) && (!handler || item.handler === handler) && (!selector || item.selector === selector));
        }), function(item) {
          element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
          handlers.splice(handlers.indexOf(item), 1);
        });
        if (handlers.length === 0) {
          clearHandlers(element);
        }
      }
    });
    return this;
  }
  function delegate(selector, eventName, handler) {
    return on.call(this, eventName, selector, handler);
  }
  function undelegate(selector, eventName, handler) {
    return off.call(this, eventName, selector, handler);
  }
  function trigger(type, params) {
    params = params || {
      bubbles: true,
      cancelable: true,
      detail: undefined
    };
    var event = new CustomEvent(type, params);
    each(this, function(element) {
      if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
        element.dispatchEvent(event);
      } else {
        triggerForPath(element, type, params);
      }
    });
    return this;
  }
  function isAttachedToDocument(element) {
    if (element === window || element === document) {
      return true;
    }
    var container = element.ownerDocument.documentElement;
    if (container.contains) {
      return container.contains(element);
    } else if (container.compareDocumentPosition) {
      return !(container.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
    }
    return false;
  }
  function triggerForPath(element, type, params) {
    params = params || {};
    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    while (element.parentNode) {
      element.dispatchEvent(event);
      element = element.parentNode;
    }
  }
  var cacheKeyProp = '_jeh';
  var id = 1;
  var handlers = {};
  var unusedKeys = [];
  function getHandlers(element) {
    if (!element[cacheKeyProp]) {
      element[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
    }
    var key = element[cacheKeyProp];
    return handlers[key] || (handlers[key] = []);
  }
  function clearHandlers(element) {
    var key = element[cacheKeyProp];
    if (handlers[key]) {
      handlers[key] = null;
      element[key] = null;
      unusedKeys.push(key);
    }
  }
  function delegateHandler(selector, handler, event) {
    var eventTarget = event._target || event.target;
    if (matches(eventTarget, selector)) {
      if (!event.currentTarget) {
        event.currentTarget = eventTarget;
      }
      handler.call(eventTarget, event);
    }
  }
  (function() {
    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
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
  ;
  return {
    get on() {
      return on;
    },
    get off() {
      return off;
    },
    get delegate() {
      return delegate;
    },
    get undelegate() {
      return undelegate;
    },
    get trigger() {
      return trigger;
    },
    __esModule: true
  };
});

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
  var closest = ($__1).closest;
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
  function trigger(type, data) {
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
        triggerForPath(element, type, params);
      }
    });
    return this;
  }
  function triggerHandler(type, data) {
    if (this[0]) {
      trigger.call(this[0], type, data, {
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
  function triggerForPath(element, type) {
    var params = arguments[2] !== (void 0) ? arguments[2] : {};
    params.bubbles = false;
    var event = new CustomEvent(type, params);
    event._target = element;
    do {
      dispatchEvent(element, event);
    } while (element = element.parentNode);
  }
  var directEventMethods = ['blur', 'click', 'focus', 'select', 'submit'];
  function dispatchEvent(element, event) {
    if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === 'function' && !event._preventDefault) {
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
    get triggerHandler() {
      return triggerHandler;
    },
    get bind() {
      return bind;
    },
    get unbind() {
      return unbind;
    },
    __esModule: true
  };
});

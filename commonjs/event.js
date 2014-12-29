"use strict";

var each = require("./util").each;
var closest = require("./selector").closest;


function on(eventNames, selector, handler, useCapture) {
  if (typeof selector === "function") {
    handler = selector;
    selector = null;
  }

  var parts, namespace, eventListener;

  eventNames.split(" ").forEach(function (eventName) {
    parts = eventName.split(".");
    eventName = parts[0] || null;
    namespace = parts[1] || null;

    eventListener = proxyHandler(handler);

    each(this, function (element) {
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

function off(eventNames, selector, handler, useCapture) {
  if (eventNames === undefined) eventNames = "";


  if (typeof selector === "function") {
    handler = selector;
    selector = null;
  }

  var parts, namespace, handlers;

  eventNames.split(" ").forEach(function (eventName) {
    parts = eventName.split(".");
    eventName = parts[0] || null;
    namespace = parts[1] || null;

    each(this, function (element) {
      handlers = getHandlers(element);

      each(handlers.filter(function (item) {
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

var eventKeyProp = "__domtastic_event__";
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
  var methodName, eventMethods = {
    preventDefault: "isDefaultPrevented",
    stopImmediatePropagation: "isImmediatePropagationStopped",
    stopPropagation: "isPropagationStopped"
  }, returnTrue = function () {
    return true;
  }, returnFalse = function () {
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
  var eventTarget = event._target || event.target, currentTarget = closest.call([eventTarget], selector, this)[0];
  if (currentTarget && currentTarget !== this) {
    if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
      handler.call(currentTarget, event);
    }
  }
}

var bind = on, unbind = off;

exports.on = on;
exports.off = off;
exports.bind = bind;
exports.unbind = unbind;
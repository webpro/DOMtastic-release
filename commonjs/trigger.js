"use strict";

var global = require("./util").global;
var each = require("./util").each;
var contains = require("./contains").contains;


var reMouseEvent = /^(?:mouse|pointer|contextmenu)|click/, reKeyEvent = /^key/;

function trigger(type, data) {
  var params = arguments[2] === undefined ? {} : arguments[2];


  params.bubbles = typeof params.bubbles === "boolean" ? params.bubbles : true;
  params.cancelable = typeof params.cancelable === "boolean" ? params.cancelable : true;
  params.preventDefault = typeof params.preventDefault === "boolean" ? params.preventDefault : false;
  params.detail = data;

  var EventConstructor = getEventConstructor(type), event = new EventConstructor(type, params);

  event._preventDefault = params.preventDefault;

  each(this, function (element) {
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
  return contains(element.ownerDocument.documentElement, element);
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

var directEventMethods = ["blur", "focus", "select", "submit"];

function dispatchEvent(element, event) {
  if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === "function" && !event._preventDefault && !event.cancelable) {
    element[event.type]();
  } else {
    element.dispatchEvent(event);
  }
}

(function () {
  function CustomEvent(event) {
    var params = arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: undefined } : arguments[1];
    return (function () {
      var customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return customEvent;
    })();
  }

  CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
  global.CustomEvent = CustomEvent;
})();

var isEventBubblingInDetachedTree = (function () {
  var isBubbling = false, doc = global.document;
  if (doc) {
    var parent = doc.createElement("div"), child = parent.cloneNode();
    parent.appendChild(child);
    parent.addEventListener("e", function () {
      isBubbling = true;
    });
    child.dispatchEvent(new CustomEvent("e", { bubbles: true }));
  }
  return isBubbling;
})();

var supportsOtherEventConstructors = (function () {
  try {
    new window.MouseEvent("click");
  } catch (e) {
    return false;
  }
  return true;
})();

exports.trigger = trigger;
exports.triggerHandler = triggerHandler;
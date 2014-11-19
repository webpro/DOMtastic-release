"use strict";

var toArray = require('./util').toArray;
var $ = require('./selector').$;


function append(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("beforeend", element);
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
    if (typeof element === "string") {
      this.insertAdjacentHTML("afterbegin", element);
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
    if (typeof element === "string") {
      this.insertAdjacentHTML("beforebegin", element);
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
    if (typeof element === "string") {
      this.insertAdjacentHTML("afterend", element);
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
  if (typeof element === "string") {
    return element;
  } else if (element instanceof Node) {
    return element.cloneNode(true);
  } else if ("length" in element) {
    return [].map.call(element, function (el) {
      return el.cloneNode(true);
    });
  }
  return element;
}

exports.append = append;
exports.prepend = prepend;
exports.before = before;
exports.after = after;
exports.clone = clone;
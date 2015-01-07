define(["exports", "./util", "./selector"], function (exports, _util, _selector) {
  "use strict";

  var toArray = _util.toArray;
  var $ = _selector.$;


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
      _each(this, append, element);
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
      _each(this, prepend, element);
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
      _each(this, before, element);
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
      _each(this, after, element);
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
});
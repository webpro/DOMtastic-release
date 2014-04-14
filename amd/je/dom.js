define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "dom";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var toArray = ($__0).toArray;
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
        var elm = l === 0 ? element : clone(element);
        append.call(this[l], elm);
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
        var elm = l === 0 ? element : clone(element);
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
        var elm = l === 0 ? element : clone(element);
        after.call(this[l], elm);
      }
    }
    return this;
  }
  function clone(element) {
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
  return {
    get append() {
      return append;
    },
    get before() {
      return before;
    },
    get after() {
      return after;
    },
    __esModule: true
  };
});


define(
  'je/util',["exports"],
  function(__exports__) {
    
    // # Util

    /**
     * Reference to the global scope
     */

    var global = new Function("return this")();

    /**
     * ## toArray
     *
     * Convert `NodeList` to `Array`.
     *
     * @param {NodeList|Array} collection
     * @return {Array}
     */

    function toArray(collection) {
        return [].slice.call(collection);
    }

    /**
     * ## makeIterable
     *
     * Return something that can be iterated over (e.g. using `forEach`).
     * Arrays and NodeLists are returned as-is, but `Node`s are wrapped in a `[]`.
     *
     * @param {Node|NodeList|Array} element
     * @return {Array|NodeList}
     */

    function makeIterable(element) {
        return element.length === undefined || element === window ? [element] : element;
    }

    /**
     * ## each
     *
     * Faster alternative to [].forEach method
     *
     * @param {Node|NodeList|Array} collection
     * @param {Function} callback
     * @returns {Node|NodeList|Array}
     */

    function each(collection, callback) {
        var length = collection.length;
        if (length !== undefined) {
            for (var i = 0; i < length; i++){
                callback(collection[i]);
            }
        } else {
            callback(collection);
        }
        return collection;
    }

    /**
     * ## extend
     *
     * Assign properties from source object(s) to target object
     *
     * @method extend
     * @param {Object} obj Object to extend
     * @param {Object} [source] Object to extend from
     * @returns {Object} Extended object
     */

    function extend(obj) {
        [].slice.call(arguments, 1).forEach(function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    }

    __exports__.global = global;
    __exports__.toArray = toArray;
    __exports__.makeIterable = makeIterable;
    __exports__.each = each;
    __exports__.extend = extend;
  });
define(
  'je/selector',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    // # Selector

    var global = __dependency1__.global;
    var makeIterable = __dependency1__.makeIterable;

    var slice = [].slice,
        hasProto = !Object.prototype.isPrototypeOf({ __proto__: null }),
        reFragment = /^\s*<(\w+|!)[^>]*>/,
        reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        reSimpleSelector = /^[\.#]?[\w-]*$/;

    /*
     * ## $
     *
     * Versatile wrapper for `querySelectorAll`.
     *
     * @param {String|Node|NodeList} selector Query selector.
     * Providing a selector string gives the default behavior.
     * Providing a Node or NodeList will return a NodeList or $Object containing the same element(s).
     * Providing a string that looks like HTML (i.e. starts with a `<tag>`) results in an attempt to create a DOM Fragment from it.
     * @param {String|Node|NodeList} context=`document` The context for the selector to query elements.
     * @return {NodeList|$Object}
     */

    var $ = function(selector, context) {

        var collection;

        if (!selector) {

            collection = document.querySelectorAll(null);

        } else if (typeof selector !== 'string') {

            collection = makeIterable(selector);

        } else if (reFragment.test(selector)) {

            collection = createFragment(selector);

        } else {

            context = context ? typeof context === 'string' ? document.querySelector(context) : context.length ? context[0] : context : document;

            collection = querySelector(selector, context);

        }

        return $.isNative ? collection : wrap(collection);

    };

    /*
     * ## Find
     *
     * Chaining for the `$` wrapper (aliasing `find` for `$`).
     *
     *     $('.selector').find('.deep').$('.deepest');
     */

    var find = function(selector) {
        return $(selector, this);
    };

    /*
     * ## Matches
     *
     * Returns true if the element would be selected by the specified selector string; otherwise, returns false.
     *
     *     $.matches(element, '.match');
     *
     * @param {Node} element Element to test
     * @param {String} selector Selector to match against element
     * @return {Boolean}
     */

    var matches = (function() {
        var context = typeof Element !== 'undefined' ? Element.prototype : global,
            _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.webkitMatchesSelector || context.msMatchesSelector || context.oMatchesSelector;
        return function(element, selector) {
            return _matches.call(element, selector);
        }
    })();

    /*
     * Use the faster `getElementById` or `getElementsByClassName` over `querySelectorAll` if possible.
     *
     * @method querySelector
     * @private
     * @param {String} selector Query selector.
     * @param {Node} context The context for the selector to query elements.
     * @return {NodeList|Node}
     */

    var querySelector = function(selector, context) {

        var isSimpleSelector = reSimpleSelector.test(selector);

        if (isSimpleSelector && !$.isNative) {
            if (selector[0] === '#') {
                return (context.getElementById ? context : document).getElementById(selector.slice(1));
            }
            if (selector[0] === '.') {
                return context.getElementsByClassName(selector.slice(1));
            }
            return context.getElementsByTagName(selector);
        }

        return context.querySelectorAll(selector);

    };

    /*
     * Create DOM fragment from an HTML string
     *
     * @method createFragment
     * @private
     * @param {String} html String representing HTML.
     * @return {NodeList}
     */

    var createFragment = function(html) {

        if (reSingleTag.test(html)) {
            return document.createElement(RegExp.$1);
        }

        var elements = [],
            container = document.createElement('div'),
            children = container.childNodes;

        container.innerHTML = html;

        for (var i = 0, l = children.length; i < l; i++) {
            elements.push(children[i]);
        }

        return elements;
    };

    /*
     * Calling `$(selector)` returns a wrapped array of elements [by default](mode.html).
     *
     * @method wrap
     * @private
     * @param {NodeList|Node|Array} collection Element(s) to wrap as a `$Object`.
     * @return {$Object} Array with augmented API.
     */

    var wrap = function(collection) {

        var wrapped = collection instanceof Array ? collection : collection.length !== undefined ? slice.call(collection) : [collection],
            methods = $._api;

        if (hasProto) {
            wrapped.__proto__ = methods;
        } else {
            for (var key in methods) {
                wrapped[key] = methods[key];
            }
        }

        return wrapped;
    };

    // Export interface

    __exports__.$ = $;
    __exports__.find = find;
    __exports__.matches = matches;
  });
define(
  'je/array',["./util","./selector","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    // # Array

    var _each = __dependency1__.each;
    var $ = __dependency2__.$;
    var matches = __dependency2__.matches;

    var ArrayProto = Array.prototype;

    // Filter the collection by selector or function.

    function filter(selector) {
        var callback = typeof selector === 'function' ? selector : function(element) {
            return matches(element, selector);
        };
        return $(ArrayProto.filter.call(this, callback));
    }

    function each(callback) {
        return _each(this, callback);
    }

    function reverse() {
        var elements = ArrayProto.slice.call(this);
        return $(ArrayProto.reverse.call(elements));
    }

    var every = ArrayProto.every,
        forEach = each,
        map = ArrayProto.map,
        some = ArrayProto.some;

    __exports__.each = each;
    __exports__.every = every;
    __exports__.filter = filter;
    __exports__.forEach = forEach;
    __exports__.map = map;
    __exports__.reverse = reverse;
    __exports__.some = some;
  });
define(
  'je/attr',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    // # Attr

    var each = __dependency1__.each;

    /**
     * ## attr
     *
     * Get the value of an attribute for the first element, or set one or more attributes for each element in the collection.
     *
     *     $('.item').attr('attrName');
     *     $('.item').attr('attrName', 'attrValue');
     *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2});
     *
     * @param {String|Object} key The name of the attribute to get or set. Or an object containing key-value pairs to set as attributes.
     * @param {String} [value] The value of the attribute to set.
     * @return {$Object} or Node/List in native mode
     */

    var attr = function(key, value) {

        if (typeof key === 'string' && typeof value === 'undefined') {
            return (this.nodeType ? this : this[0]).getAttribute(key);
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
    };

    // Export interface

    __exports__.attr = attr;
  });
define(
  'je/class',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    // # Class

    var makeIterable = __dependency1__.makeIterable;
    var each = __dependency1__.each;

    /**
     * ## addClass
     *
     *     $('.item').addClass('bar');
     *
     * @param {String} value The class name to add to the element(s).
     * @return {$Object} or Node/List in native mode
     */

    var addClass = function(value) {
        each(this, function(element) {
            element.classList.add(value);
        });
        return this;
    };

    /**
     * ## removeClass
     *
     *     $('.items').removeClass('bar');
     *
     * @param {String} value The class name to remove from the element(s).
     * @return {$Object} or Node/List in native mode
     */

    var removeClass = function(value) {
        each(this, function(element) {
            element.classList.remove(value);
        });
        return this;
    };

    /**
     * ## toggleClass
     *
     *     $('.item').toggleClass('bar');
     *
     * @param {String} value The class name to toggle at the element(s).
     * @return {$Object} or Node/List in native mode
     */

    var toggleClass = function(value) {
        each(this, function(element) {
            element.classList.toggle(value);
        });
        return this;
    };

    /**
     * ## hasClass
     *
     *     $('.item').hasClass('bar');
     *
     * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
     * returns `true` if _any_ of them contains the class name.
     * @return {boolean}
     */

    var hasClass = function(value) {
        return makeIterable(this).some(function(element) {
            return element.classList.contains(value);
        });
    };

    // Export interface

    __exports__.addClass = addClass;
    __exports__.removeClass = removeClass;
    __exports__.toggleClass = toggleClass;
    __exports__.hasClass = hasClass;
  });
define(
  'je/dom',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    // # DOM Manipulation

    var toArray = __dependency1__.toArray;

    /**
     * ## append
     *
     *     $('.item').append('<p>more</p>');
     *
     * @param {String|Node|NodeList|$Object} element What to append to the element(s).
     * Clones elements as necessary.
     * @return {Node|NodeList|$Object} Returns the object it was applied to.
     */

    var append = function(element) {
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
    };

    /**
     * ## before
     *
     *     $('.items').before('<p>prefix</p>');
     *
     * @param {String|Node|NodeList|$Object} element What to place as sibling(s) before to the element(s).
     * Clones elements as necessary.
     * @return {Node|NodeList|$Object} Returns the object it was applied to.
     */

    var before = function(element) {
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
    };

    /**
     * ## after
     *
     *     $('.items').after('<span>suf</span><span>fix</span>');
     *
     * @param {String|Node|NodeList|$Object} element What to place as sibling(s) after to the element(s).
     * Clones elements as necessary.
     * @return {Node|NodeList|$Object} Returns the object it was applied to.
     */

    var after = function(element) {
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
    };

    /**
     * @method clone
     * @private
     * @param {String|Node|NodeList|Array} element The element(s) to clone.
     * @return {String|Node|NodeList|Array} The cloned element(s)
     */

    var clone = function(element) {
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
    };

    // Export interface

    __exports__.append = append;
    __exports__.before = before;
    __exports__.after = after;
  });
define(
  'je/dom_extra',["./util","./dom","./selector","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    // # DOM Manipulation (extra)

    var each = __dependency1__.each;
    var append = __dependency2__.append;
    var before = __dependency2__.before;
    var after = __dependency2__.after;
    var $ = __dependency3__.$;

    /**
     * ## appendTo
     *
     * Inverse of [append](dom.html#append).
     *
     *     $('.item').appendTo(container);
     *
     * @param {Node|NodeList|$Object} element What to append the element(s) to.
     * Clones elements as necessary.
     * @return {$Object}
     */

    function appendTo(element) {
        var context = typeof element === 'string' ? $(element) : element;
        append.call(context, this);
        return this;
    }

    /**
     * ## remove
     *
     * Remove the collection from the DOM.
     *
     * @return {Array} Removed elements
     */

    function remove() {
        return each(this, function(element) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }

    /**
     * ## replaceWith
     *
     * Replace each element in the collection with the provided new content, and return the array of elements that were removed.
     *
     * @return {Array}
     */

    function replaceWith() {
        return before.apply(this, arguments).remove();
    }

    // Export interface

    __exports__.appendTo = appendTo;
    __exports__.remove = remove;
    __exports__.replaceWith = replaceWith;
  });
define(
  'je/event',["./util","./selector","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    // # Events

    var global = __dependency1__.global;
    var each = __dependency1__.each;
    var matches = __dependency2__.matches;

    /**
     * ## on
     *
     * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
     *
     *     $('.item').on('click', callback);
     *     $('.container').on('click', '.item', handler);
     *
     * @param {String} eventName
     * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Boolean} useCapture=false
     * @return {Node|NodeList|$Object} Returns the object it was applied to.
     */

    var on = function(eventName, selector, handler, useCapture) {

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
    };

    /**
     * ## off
     *
     * Shorthand for `removeEventListener`. Delegates to `undelegate` if that signature is used.
     *
     *     $('.item').off('click', callback);
     *
     * @param {String} eventName Name or type of the event
     * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Boolean} useCapture=false
     * @return {Node|NodeList|$Object} Returns the object it was applied to.
     */

    var off = function(eventName, selector, handler, useCapture) {

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

            var handlers = getHandlers(element) || [];

            if (!eventName && !namespace && !selector && !handler) {

                each(handlers, function(item) {
                    element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
                });

                clearHandlers(element);

            } else {

                each(handlers.filter(function(item) {
                    return ((!eventName || item.eventName === eventName) &&
                        (!namespace || item.namespace === namespace) &&
                        (!handler || item.handler === handler) &&
                        (!selector || item.selector === selector));
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
    };

    /**
     * ## delegate
     *
     * Delegate events triggered at descendants to element(s)
     *
     *     $('.container').delegate('.item', 'click', handler);
     *
     * @param {String} selector Selector to filter descendants that delegate the event to this element.
     * @param {String} eventName Name or type of the event
     * @param {Function} fn Event handler
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var delegate = function(selector, eventName, fn) {
        return on.call(this, eventName, selector, fn);
    };

    /**
     * ## undelegate
     *
     * Undelegate events triggered at descendants to element(s)
     *
     *     $('.container').undelegate('.item', 'click', handler);
     *
     * @param {String} selector Selector to filter descendants that undelegate the event to this element.
     * @param {String} eventName Name or type of the event
     * @param {Function} fn Event handler
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var undelegate = function(selector, eventName, fn) {
        return off.call(this, eventName, selector, fn);
    };

    /**
     * ## trigger
     *
     * Trigger event at element(s)
     *
     *     $('.item').trigger('anyEventType');
     *
     * @param {String} type Type of the event
     * @param {Object} [params] Event parameters (optional)
     * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
     * @param {Boolean} params.cancelable=true Is the event cancelable or not.
     * @param {Mixed} params.detail=undefined Additional information about the event.
     * @return {Node|NodeList|$Object} Returns the object it was applied to (`this`).
     */

    var trigger = function(type, params) {
        params = params || { bubbles: true, cancelable: true, detail: undefined };
        var event = new CustomEvent(type, params);
        each(this, function(element) {
            if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
                element.dispatchEvent(event);
            } else {
                triggerForPath(element, type, params);
            }
        });
        return this;
    };

    /**
     * Check whether the element is attached to (or detached from) the document
     *
     * @method isAttachedToDocument
     * @private
     * @param {Node} element Element to test
     * @return {Boolean}
     */

    var isAttachedToDocument = function(element) {
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
    };

    /**
     * Dispatch the event at the element and its ancestors.
     * Required to support delegated events in browsers that don't bubble events in detached DOM trees.
     *
     * @method triggerForPath
     * @private
     * @param {Node} element First element to dispatch the event
     * @param {String} type Type of the event
     * @param {Object} [params] Event parameters (optional)
     * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
     * Will be set to false (but shouldn't matter since events don't bubble anyway).
     * @param {Boolean} params.cancelable=true Is the event cancelable or not.
     * @param {Mixed} params.detail=undefined Additional information about the event.
     */

    var triggerForPath = function(element, type, params) {
        params = params || {};
        params.bubbles = false;
        var event = new CustomEvent(type, params);
        event._target = element;
        while (element.parentNode) {
            element.dispatchEvent(event);
            element = element.parentNode;
        }
    };

    /**
     * Get event handlers from an element
     *
     * @method getHandlers
     * @private
     * @param {Node} element
     * @return {Array}
     */

    var cacheKeyProp = '_jeh';
    var id = 1;
    var handlers = {};
    var unusedKeys = [];

    var getHandlers = function(element) {
        if (!element[cacheKeyProp]) {
            element[cacheKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
        }
        var key = element[cacheKeyProp];
        return handlers[key] || (handlers[key] = []);
    };

    /**
     * Clear event handlers for an element
     *
     * @method clearHandlers
     * @private
     * @param {Node} element
     */

    var clearHandlers = function(element) {
        var key = element[cacheKeyProp];
        if (handlers[key]) {
            handlers[key] = null;
            element[key] = null;
            unusedKeys.push(key);
        }
    };

    /**
     * Function to test whether delegated events match the provided `selector` (filter),
     * and then actually call the provided event handler.
     * Also sets `event.currentTarget` on the event object.
     *
     * @method delegateHandler
     * @private
     * @param {String} selector Selector to filter descendants that undelegate the event to this element.
     * @param {Function} fn Event handler
     * @param {Event} event
     */

    var delegateHandler = function(selector, handler, event) {
        var eventTarget = event._target || event.target;
        if (matches(eventTarget, selector)) {
            if (!event.currentTarget) {
                event.currentTarget = eventTarget;
            }
            handler.call(eventTarget, event);
        }
    };

    /**
     * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
     * Needed to support IE (9, 10, 11) & PhantomJS
     */

    (function() {
        var CustomEvent = function(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
        global.CustomEvent = CustomEvent;
    })();

    // Are events bubbling in detached DOM trees?

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
            child.dispatchEvent(new CustomEvent('e', { bubbles: true }));
        }
        return isBubbling;
    })();

    // Export interface

    __exports__.on = on;
    __exports__.off = off;
    __exports__.delegate = delegate;
    __exports__.undelegate = undelegate;
    __exports__.trigger = trigger;
  });
define(
  'je/html',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    // # HTML

    var each = __dependency1__.each;

    /*
     * ## html
     *
     * Get the HTML contents of the first element, or set the HTML contents for each element in the collection.
     *
     *     $('.item').html();
     *     $('.item').html('<span>more</span>');
     *
     * @param {String} [fragment] HTML fragment to set for the element
     * @return {Node|NodeList|$Object} Returns the object it was applied to.
     */

    var html = function(fragment) {

        if (typeof fragment !== 'string') {
            return (this.nodeType ? this : this[0]).innerHTML;
        }

        each(this, function(element) {
            element.innerHTML = fragment;
        });

        return this;

    };

    // Export interface

    __exports__.html = html;
  });
define(
  'je/selector_extra',["./selector","exports"],
  function(__dependency1__, __exports__) {
    
    // # Selector (extra)

    var each = require('./util').each;
    var $ = __dependency1__.$;
    var matches = __dependency1__.matches;

    /*
     * ## children
     *
     * Return children of each element in the collection (optionally filtered by a selector).
     *
     *     $('.selector').children();
     *     $('.selector').children('.filter');
     */

    var children = function(selector) {
        var nodes = [];
        each(this, function(element) {
            each(element.children, function(child) {
                if (!selector || (selector && matches(child, selector))) {
                    nodes.push(child);
                }
            });
        });
        return $(nodes);
    };

    /**
     * ## eq
     *
     * Return a collection containing only the one at the specified index.
     *
     * @param {Number} index
     * @returns {$Object}
     */

    var eq = function(index) {
        return slice.call(this, index, index + 1);
    };

    /**
     * ## get
     *
     * Return the DOM element at the provided index.
     *
     * @param {Number} index
     * @returns {Node}
     */

    var get = function(index) {
        return this[index];
    };

    /**
     * ## slice
     *
     * Return a new, sliced collection.
     *
     * @param {Number} start
     * @param {Number} end
     * @returns {$Object}
     */

    var slice = function(start, end) {
        return $([].slice.apply(this, arguments));
    };

    __exports__.children = children;
    __exports__.eq = eq;
    __exports__.get = get;
    __exports__.slice = slice;
  });
define(
  'je/mode',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    /*
     * # Opt-in to Native Mode
     *
     * The default, non-intrusive mode is similar to how jQuery operates: working with static, array-like `$` objects:
     *
     *     $('.items').append('<span>foo</span>);
     *     $(document.body).on('click', '.tab', handler);
     *
     * However, you can opt-in to work with live NodeList objects.
     * In this "native" mode, the `Node` and `NodeList` prototypes are augmented (in a safe and reversible manner) to fill up the chainable API,
     * to enable working with `Node` and `NodeList` objects directly:
     *
     *     var collection = document.querySelectorAll('.items');
     *     collection.append('<span>foo</span>);
     *     collection.addClass('bar');
     *     collection.forEach(iteratorFn);
     *     collection.find('.more');
     *
     *     document.body.on('click', '.tab', handler)
     *
     * Note that in native mode, `$(selector)` can stil be used. It returns a NodeList.
     *
     * Build the lib using Grunt with `mode` not excluded.
     * Use `$.native()` to activate this behavior. The API is the same in both modes.
     */

    var global = __dependency1__.global;

    var isNative = false;

    var native = function(native) {
        var wasNative = isNative;
        isNative = typeof native === 'boolean' ? native : true;
        if (global.$) {
            global.$.isNative = isNative;
        }
        if (!wasNative && isNative) {
            augmentNativePrototypes(this._api, this._apiNodeList);
        }
        if (wasNative && !isNative) {
            unaugmentNativePrototypes(this._api, this._apiNodeList);
        }
        return isNative;
    };

    var NodeProto = typeof Node !== 'undefined' && Node.prototype,
        NodeListProto = typeof NodeList !== 'undefined' && NodeList.prototype;

    /*
     * Add a property (i.e. method) to an object in a safe and reversible manner.
     * Only add the method if object not already had it (non-inherited).
     */

    var augment = function(obj, key, value) {
        if (!obj.hasOwnProperty(key)) {
            Object.defineProperty(obj, key, {
                value: value,
                configurable: true,
                enumerable: false
            });
        }
    };

    /*
     * Remove property from object (only inherited properties will be removed).
     */

    var unaugment = function(obj, key) {
        delete obj[key];
    };

    /*
     * Augment native `Node` and `NodeList` objects in native mode.
     */

    var augmentNativePrototypes = function(methodsNode, methodsNodeList) {

        var key;

        for (key in methodsNode) {
            augment(NodeProto, key, methodsNode[key]);
            augment(NodeListProto, key, methodsNode[key]);
        }

        for (key in methodsNodeList) {
            augment(NodeListProto, key, methodsNodeList[key]);
        }
    };

    /*
     * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
     * Mainly used for tests.
     */

    var unaugmentNativePrototypes = function(methodsNode, methodsNodeList) {

        var key;

        for (key in methodsNode) {
            unaugment(NodeProto, key);
            unaugment(NodeListProto, key);
        }

        for (key in methodsNodeList) {
            unaugment(NodeListProto, key);
        }
    };

    // Export interface

    __exports__.isNative = isNative;
    __exports__.native = native;
  });
define(
  'je/noconflict',["./util","exports"],
  function(__dependency1__, __exports__) {
    
    /*
     * # noConflict
     *
     * In case another library sets the global `$` variable before jQuery Evergreen does,
     * this method can be used to return the global `$` to that other library.
     */

    var global = __dependency1__.global;

    // Save the previous value of the global `$` variable, so that it can be restored later on.

    var previousLib = global.$;

    // Put jQuery Evergreen in noConflict mode, returning the `$` variable to its previous owner.
    // Returns a reference to jQuery Evergreen.

    var noConflict = function() {
        global.$ = previousLib;
        return this;
    };

    // Export interface

    __exports__.noConflict = noConflict;
  });
define(
  'je/api',["./util","./array","./attr","./class","./dom","./dom_extra","./event","./html","./selector","./selector_extra","./mode","./noconflict","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __exports__) {
    
    // # API

    var extend = __dependency1__.extend;

    var api = {},
        apiNodeList = {},
        $ = {};

    // Import modules to build up the API

    var array = __dependency2__;
    var attr = __dependency3__;
    var className = __dependency4__;
    var dom = __dependency5__;
    var dom_extra = __dependency6__;
    var event = __dependency7__;
    var html = __dependency8__;
    var selector = __dependency9__;
    var selector_extra = __dependency10__;

    if (selector !== undefined) {
        $ = selector.$;
        $.matches = selector.matches;
        api.find = selector.find;
    }

    var mode = __dependency11__;
    extend($, mode);
    var noconflict = __dependency12__;
    extend($, noconflict);

    extend(api, array, attr, className, dom, dom_extra, event, html, selector_extra);
    extend(apiNodeList, array);

    // Util

    $.extend = extend;

    // Internal properties to switch between default and native mode

    $._api = api;
    $._apiNodeList = apiNodeList;

    // Export interface

    __exports__["default"] = $;
  });
define(
  'main',["./je/api","exports"],
  function(__dependency1__, __exports__) {
    
    /**
     * # jQuery Evergreen
     *
     * Small & fast DOM and event library for modern browsers.
     * Having the same familiar API as jQuery (but without the extra "weight" of modules like `$.ajax`, `$.animate`, and `$.Deferred`), it works great stand-alone or paired up with e.g. Backbone.
     * The full version is only 7KB minified (2KB gzip), but it's easy to create a custom build to exclude parts you don't need.
     *
     * The [source](https://github.com/webpro/jquery-evergreen) is written in the ES6 Modules format, and transpiled to an AMD and a CommonJS version using the [ES6 Module Transpiler](http://square.github.io/es6-module-transpiler/). And last but also least, the CommonJS version is "browserified".
     *
     * Please find the table of contents in upper right.
     */

    var $ = __dependency1__["default"];

    __exports__["default"] = $;
  });define('jquery-evergreen',['main'],function(main){return main['default'];});
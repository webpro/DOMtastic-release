define(['exports', '../util', '../selector/closest'], function (exports, _util, _selectorClosest) {
    /**
     * @module Events
     */

    'use strict';

    exports.__esModule = true;

    /**
     * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
     *
     * @param {String} eventNames List of space-separated event types to be added to the element(s)
     * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Boolean} useCapture=false
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').on('click', callback);
     *     $('.container').on('click focus', '.item', handler);
     */

    function on(eventNames, selector, handler, useCapture, once) {
        var _this = this;

        if (typeof selector === 'function') {
            handler = selector;
            selector = null;
        }

        var parts = undefined,
            namespace = undefined,
            eventListener = undefined;

        eventNames.split(' ').forEach(function (eventName) {

            parts = eventName.split('.');
            eventName = parts[0] || null;
            namespace = parts[1] || null;

            eventListener = proxyHandler(handler);

            _util.each(_this, function (element) {

                if (selector) {
                    eventListener = delegateHandler.bind(element, selector, eventListener);
                }

                if (once) {
                    (function () {
                        var listener = eventListener;
                        eventListener = function (event) {
                            off.call(element, eventNames, selector, handler, useCapture);
                            listener.call(element, event);
                        };
                    })();
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

    /**
     * Shorthand for `removeEventListener`.
     *
     * @param {String} eventNames List of space-separated event types to be removed from the element(s)
     * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Boolean} useCapture=false
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').off('click', callback);
     *     $('#my-element').off('myEvent myOtherEvent');
     *     $('.item').off();
     */

    function off(eventNames, selector, handler, useCapture) {
        if (eventNames === undefined) eventNames = '';

        var _this2 = this;

        if (typeof selector === 'function') {
            handler = selector;
            selector = null;
        }

        var parts = undefined,
            namespace = undefined,
            handlers = undefined;

        eventNames.split(' ').forEach(function (eventName) {

            parts = eventName.split('.');
            eventName = parts[0] || null;
            namespace = parts[1] || null;

            _util.each(_this2, function (element) {

                handlers = getHandlers(element);

                _util.each(handlers.filter(function (item) {
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

    /**
     * Add event listener and execute the handler at most once per element.
     *
     * @param eventNames
     * @param selector
     * @param handler
     * @param useCapture
     * @return {Object} The wrapped collection
     * @chainable
     * @example
     *     $('.item').one('click', callback);
     */

    function one(eventNames, selector, handler, useCapture) {
        return on.call(this, eventNames, selector, handler, useCapture, 1);
    }

    /**
     * Get event handlers from an element
     *
     * @private
     * @param {Node} element
     * @return {Array}
     */

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

    /**
     * Clear event handlers for an element
     *
     * @private
     * @param {Node} element
     */

    function clearHandlers(element) {
        var key = element[eventKeyProp];
        if (handlers[key]) {
            handlers[key] = null;
            element[eventKeyProp] = null;
            unusedKeys.push(key);
        }
    }

    /**
     * Function to create a handler that augments the event object with some extra methods,
     * and executes the callback with the event and the event data (i.e. `event.detail`).
     *
     * @private
     * @param handler Callback to execute as `handler(event, data)`
     * @return {Function}
     */

    function proxyHandler(handler) {
        return function (event) {
            handler.call(this, augmentEvent(event), event.detail);
        };
    }

    /**
     * Attempt to augment events and implement something closer to DOM Level 3 Events.
     *
     * @private
     * @param {Object} event
     * @return {Function}
     */

    var augmentEvent = (function () {

        var methodName = undefined,
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

    /**
     * Function to test whether delegated events match the provided `selector` (filter),
     * if the event propagation was stopped, and then actually call the provided event handler.
     * Use `this` instead of `event.currentTarget` on the event object.
     *
     * @private
     * @param {String} selector Selector to filter descendants that undelegate the event to this element.
     * @param {Function} handler Event handler
     * @param {Event} event
     */

    function delegateHandler(selector, handler, event) {
        var eventTarget = event._target || event.target,
            currentTarget = _selectorClosest.closest.call([eventTarget], selector, this)[0];
        if (currentTarget && currentTarget !== this) {
            if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
                handler.call(currentTarget, event);
            }
        }
    }

    var bind = on,
        unbind = off;

    /*
     * Export interface
     */

    exports.on = on;
    exports.off = off;
    exports.one = one;
    exports.bind = bind;
    exports.unbind = unbind;
});
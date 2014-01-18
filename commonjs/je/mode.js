"use strict";
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

var global = require("./util").global;

var isNative = false;

var native = function(native) {
    var wasNative = isNative;
    isNative = typeof native === 'boolean' ? native : true;
    if (global.$) {
        global.$.isNative = isNative;
    }
    if (!wasNative && isNative) {
        augmentNativePrototypes(this.getNodeMethods(), this.getNodeListMethods());
    }
    if (wasNative && !isNative) {
        unaugmentNativePrototypes(this.getNodeMethods(), this.getNodeListMethods());
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

exports.isNative = isNative;
exports.native = native;
"use strict";

var global = require('./util').global;


var isNative = false;

function native(goNative) {
  if (goNative === undefined) goNative = true;
  var wasNative = isNative;
  isNative = goNative;
  if (global.$) {
    global.$.isNative = isNative;
  }
  if (!wasNative && isNative) {
    augmentNativePrototypes(this.fn, this.fnList);
  }
  if (wasNative && !isNative) {
    unaugmentNativePrototypes(this.fn, this.fnList);
  }
  return isNative;
}

var NodeProto = typeof Node !== "undefined" && Node.prototype, NodeListProto = typeof NodeList !== "undefined" && NodeList.prototype;

/*
 * Add a property (i.e. method) to an object in a safe and reversible manner.
 * Only add the method if object not already had it (non-inherited).
 *
 * @private
 */

function augment(obj, key, value) {
  if (!obj.hasOwnProperty(key)) {
    Object.defineProperty(obj, key, {
      value: value,
      configurable: true,
      enumerable: false
    });
  }
}

/*
 * Remove property from object (only inherited properties will be removed).
 *
 * @private
 */

var unaugment = function (obj, key) {
  delete obj[key];
};

/*
 * Augment native `Node` and `NodeList` objects in native mode.
 *
 * @private
 */

function augmentNativePrototypes(methodsNode, methodsNodeList) {
  var key;

  for (key in methodsNode) {
    augment(NodeProto, key, methodsNode[key]);
    augment(NodeListProto, key, methodsNode[key]);
  }

  for (key in methodsNodeList) {
    augment(NodeListProto, key, methodsNodeList[key]);
  }
}

/*
 * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
 * Mainly used for tests.
 *
 * @private
 */

function unaugmentNativePrototypes(methodsNode, methodsNodeList) {
  var key;

  for (key in methodsNode) {
    unaugment(NodeProto, key);
    unaugment(NodeListProto, key);
  }

  for (key in methodsNodeList) {
    unaugment(NodeListProto, key);
  }
}

exports.isNative = isNative;
exports.native = native;
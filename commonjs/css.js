/**
 * @module Attr
 */

"use strict";

var each = require('./util').each;

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function camelize(value) {
  return value.replace(/-([\da-z])/gi, function (matches, letter) {
    return letter.toUpperCase();
  });
}

function dasherize(value) {
  return value.replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Get the value of a style property for the first element, or set one or more style properties for each element in the collection.
 *
 * @param {String|Object} key The name of the style property to get or set. Or an object containing key-value pairs to set as style properties.
 * @param {String} [value] The value of the style property to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').css('padding-left'); // get
 *     $('.item').css('color', '#f00'); // set
 *     $('.item').css({'border-width', '1px'}, {'display', 'inline-block}); // set multiple
 */

function css(key, value) {
  var styleProps, prop, val;

  if (typeof key === "string") {
    key = camelize(key);

    if (typeof value === "undefined") {
      var element = this.nodeType ? this : this[0];
      if (element) {
        val = element.style[key];
        return isNumeric(val) ? parseFloat(val) : val;
      }
      return undefined;
    }

    styleProps = {};
    styleProps[key] = value;
  } else {
    styleProps = key;
    for (prop in styleProps) {
      val = styleProps[prop];
      delete styleProps[prop];
      styleProps[camelize(prop)] = val;
    }
  }

  each(this, function (element) {
    for (prop in styleProps) {
      if (styleProps[prop] || styleProps[prop] === 0) {
        element.style[prop] = styleProps[prop];
      } else {
        element.style.removeProperty(dasherize(prop));
      }
    }
  });

  return this;
}

exports.css = css;
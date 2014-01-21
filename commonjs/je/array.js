"use strict";
// # Array

var _each = require("./util").each;
var $ = require("./selector").$;
var matches = require("./selector").matches;

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

exports.each = each;
exports.every = every;
exports.filter = filter;
exports.forEach = forEach;
exports.map = map;
exports.reverse = reverse;
exports.some = some;
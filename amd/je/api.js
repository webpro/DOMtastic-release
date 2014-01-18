define(
  ["./attr","./class","./dom","./event","./html","./selector","./mode","./noconflict","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __exports__) {
    "use strict";
    /*
     * # API
     *
     * Import modules to build the API.
     */

    var api = {},
        $ = {};

    var attr = __dependency1__["default"];
    api.attr = attr;

    var addClass = __dependency2__.addClass;
    var removeClass = __dependency2__.removeClass;
    var toggleClass = __dependency2__.toggleClass;
    var hasClass = __dependency2__.hasClass;
    api.addClass = addClass;
    api.removeClass = removeClass;
    api.toggleClass = toggleClass;
    api.hasClass = hasClass;

    var append = __dependency3__.append;
    var before = __dependency3__.before;
    var after = __dependency3__.after;
    api.append = append;
    api.before = before;
    api.after = after;

    var on = __dependency4__.on;
    var off = __dependency4__.off;
    var delegate = __dependency4__.delegate;
    var undelegate = __dependency4__.undelegate;
    var trigger = __dependency4__.trigger;
    api.on = on;
    api.off = off;
    api.delegate = delegate;
    api.undelegate = undelegate;
    api.trigger = trigger;

    var html = __dependency5__["default"];
    api.html = html;

    var $ = __dependency6__.$;
    var find = __dependency6__.find;
    api.find = find;

    var isNative = __dependency7__.isNative;
    var native = __dependency7__.native;
    $.isNative = isNative;
    $.native = native;

    var noConflict = __dependency8__["default"];
    $.noConflict = noConflict;

    /*
     * The `apiNodeList` object represents the API that gets augmented onto
     * either the wrapped array or the native `NodeList` object.
     */

    var apiNodeList = {};

    ['every', 'filter', 'forEach', 'map', 'reverse', 'some'].forEach(function(methodName) {
        apiNodeList[methodName] = Array.prototype[methodName];
    });

    /*
     * Augment the `$` function to be able to:
     *
     * - wrap the `$` objects and add the API methods
     * - switch to native mode
     */

    $.getNodeMethods = function() {
        return api;
    };

    $.getNodeListMethods = function() {
        return apiNodeList;
    };

    $.apiMethods = function(api, apiNodeList) {

        var methods = apiNodeList,
            key;

        for (key in api) {
            methods[key] = api[key];
        }

        return methods;

    }(api, apiNodeList);

    // Export interface

    __exports__["default"] = $;
  });
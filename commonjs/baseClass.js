/**
 * @module BaseClass
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _selectorIndex = require('./selector/index');

var _util = require('./util');

exports['default'] = function (api) {
    var Base = function Base() {
        _classCallCheck(this, Base);

        _selectorIndex.Wrapper.call(this, _selectorIndex.$.apply(undefined, arguments));
    };

    _util.extend(Base.prototype, api);
    return Base;
};

module.exports = exports['default'];
define(['exports', 'module', './selector/index', './util'], function (exports, module, _selectorIndex, _util) {
    /**
     * @module BaseClass
     */

    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    module.exports = function (api) {
        var Base = function Base() {
            _classCallCheck(this, Base);

            _selectorIndex.Wrapper.call(this, _selectorIndex.$.apply(undefined, arguments));
        };

        _util.extend(Base.prototype, api);
        return Base;
    };
});
define(['exports', 'module', './selector/index', './util'], function (exports, module, _selectorIndex, _util) {
    /**
     * @module BaseClass
     */

    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    module.exports = function (api) {

        /**
         * Provide subclass for classes or components to extend from.
         * The opposite and successor of plugins (no need to extend `$.fn` anymore, complete control).
         *
         * @return {Class} The class to extend from, including all `$.fn` methods.
         * @example
         *     import { BaseClass } from  'domtastic';
         *
         *     class MyComponent extends BaseClass {
         *         doSomething() {
         *             return this.addClass('.foo');
         *         }
         *     }
         *
         *     let component = new MyComponent('body');
         *     component.doSomething();
         *
         * @example
         *     import $ from  'domtastic';
         *
         *     class MyComponent extends $.BaseClass {
         *         progress(value) {
         *             return this.attr('data-progress', value);
         *         }
         *     }
         *
         *     let component = new MyComponent(document.body);
         *     component.progress('ive').append('<p>enhancement</p>');
         */

        var BaseClass = function BaseClass() {
            _classCallCheck(this, BaseClass);

            _selectorIndex.Wrapper.call(this, _selectorIndex.$.apply(undefined, arguments));
        };

        _util.extend(BaseClass.prototype, api);
        return BaseClass;
    };
});
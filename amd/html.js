define(['./util'], function($__0) {
  "use strict";
  var __moduleName = "html";
  if (!$__0 || !$__0.__esModule)
    $__0 = {'default': $__0};
  var each = ($__0).each;
  function html(fragment) {
    if (typeof fragment !== 'string') {
      var element = this.nodeType ? this : this[0];
      return element ? element.innerHTML : undefined;
    }
    each(this, function(element) {
      element.innerHTML = fragment;
    });
    return this;
  }
  ;
  return {
    get html() {
      return html;
    },
    __esModule: true
  };
});

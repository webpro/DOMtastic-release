define(["exports"], function (exports) {
  "use strict";

  function contains(container, element) {
    if (!container || !element || container === element) {
      return false;
    } else if (container.contains) {
      return container.contains(element);
    } else if (container.compareDocumentPosition) {
      return !(container.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
    }
    return false;
  }


  exports.contains = contains;
});
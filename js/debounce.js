'use strict';

(function () {
  var DEBOUNCE_TIME = 500; // ms
  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_TIME);
  };
})();

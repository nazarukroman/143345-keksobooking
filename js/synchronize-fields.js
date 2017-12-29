'use strict';

(function () {
  window.synchronizeFields = function (firstElement, secondElement, firstValue, secondValue, callback) {
    var firstElementChangeHandler = function () {
      var newFirstValue = secondValue[firstValue.indexOf(firstElement.value)];
      callback(secondElement, newFirstValue);
    };
    firstElement.addEventListener('change', firstElementChangeHandler);

    var secondElementChangeHandler = function () {
      var newSecondValue = firstValue[secondValue.indexOf(secondElement.value)];
      callback(firstElement, newSecondValue);
    };
    secondElement.addEventListener('change', secondElementChangeHandler);
  };
})();

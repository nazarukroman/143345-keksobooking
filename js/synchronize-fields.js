'use strict';

(function () {
  var synchronizeFields = function (firstElement, secondElement, firsValue, secondValue, callback) {
    var firstElementChangeHandler = function () {
      var newFirstValue = firstElement.value;
      var newSecondValue;
      var indexValue = firsValue.indexOf(newFirstValue);

      if (newFirstValue === secondValue[indexValue]) {
        newSecondValue = newFirstValue;
      }

      if (typeof callback === 'function') {
        callback(secondElement, newSecondValue);
      }
    };

    firstElement.addEventListener('change', firstElementChangeHandler);
  };

  var syncValues = function (element, value) {
    element.value = value;
  };


  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
})();

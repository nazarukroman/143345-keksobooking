'use strict';

(function () {
  var synchronizeFields = function (firstElement, secondElement, firstValue, secondValue, callback) {
    var elementChangeHandler = function () {
      var newFirstValue = firstElement.value;
      var newSecondValue = secondValue.value;
      var indexFirstValue = firstValue.indexOf(newFirstValue);
      var indexSecondValue = secondValue.indexOf(newSecondValue);

      if (newFirstValue === secondValue[indexFirstValue]) {
        newSecondValue = newFirstValue;
      } else if (newSecondValue === firstValue[indexSecondValue]) {
        newFirstValue = newSecondValue;
      }

      if (typeof callback === 'function') {
        callback(secondElement, newSecondValue);
      }
    };

    firstElement.addEventListener('change', elementChangeHandler);
    secondElement.addEventListener('change', elementChangeHandler);
  };

  var syncValues = function (element, value) {
    element.value = value;
  };


  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
})();

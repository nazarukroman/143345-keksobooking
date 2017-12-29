'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var formFieldset = noticeForm.querySelectorAll('fieldset');
  /** 
   * Добавляем атрибут disabled для полей формы
   */
  var addDisabledFieldset = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].setAttribute('disabled', 'disabled');
    }
  };
  addDisabledFieldset();

  /** 
   * Удаляем атрибут disabled с полей формы
   */
  var removeDisabledFieldset = function () {
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].removeAttribute('disabled');
    }
  };

  var title = document.querySelector('#title');

  var titleInvalidHandler = function () {
    if (title.validity.tooShort) {
      title.setAttribute('style', 'border-color: red');
    } else if (title.validity.tooLong) {
      title.setAttribute('style', 'border-color: red');
    } else if (title.validity.valueMissing) {
      title.setAttribute('style', 'border-color: red');
    } else {
      title.setCustomValidity('');
      title.removeAttribute('style');
    }
  };
  /**
   * Обработчик событий для "Заголовка объявления"
   * Если сообщение сообщение слишком короткое, длинное или не значение пропущено
   * То у инпута border становится красным
   * Если полве валидное, то удаляется атрибут style
   */
  title.addEventListener('invalid', titleInvalidHandler);

  /**
   * Если число слишком маленькое, большое или вводится не число
   * То у инпута border становится красным
   * Если полве валидное, то удаляется атрибут style
   */
  var priceInputInvalidHandler = function () {
    if (priceInput.validity.rangeUnderflow) {
      title.setAttribute('style', 'border-color: red');
    } else if (priceInput.validity.rangeOverflow) {
      title.setAttribute('style', 'border-color: red');
    } else if (priceInput.validity.typeMismatch) {
      title.setAttribute('style', 'border-color: red');
    } else {
      title.removeAttribute('style');
    }
  };

  /**
   * В поле "Адрес" записываем координаты главной метки
   * @param {[number]} xCoord [Координата X]
   * @param {[number]} yCoord [Координата Y]
   */
  var setAddress = function (xCoord, yCoord) {
    var addressInput = document.querySelector('#address');
    var addressString = 'x: ' + xCoord + ', ' + 'y: ' + yCoord;

    addressInput.setAttribute('value', addressString);
  };

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var syncValues = function (element, value) {
    element.value = value;
  };
  window.synchronizeFields(timeIn, timeOut, window.data.times, window.data.times, syncValues);

  var accomondationType = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var accomondationTypes = ['bungalo', 'flat', 'house', 'palace'];
  var accomondationPrices = [0, 1000, 5000, 10000];
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };
  window.synchronizeFields(accomondationType, priceInput, accomondationTypes, accomondationPrices, syncValueWithMin);
  priceInput.addEventListener('invalid', priceInputInvalidHandler);

  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var rooms = ['1', '2', '3', '100'];
  var guests = ['1', '2', '3', '0'];
  window.synchronizeFields(roomNumber, roomCapacity, rooms, guests, syncValues);

  var onLoad = function (offers) {
    console.log('completed');
  };

  var onError = function (errorMassage) {
    console.log(errorMassage);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), onLoad, onError);
  };

  noticeForm.addEventListener('submit', formSubmitHandler);

  window.form = {
    removeDisabledFieldset: removeDisabledFieldset,
    noticeForm: noticeForm,
    setAddress: setAddress
  };
})();

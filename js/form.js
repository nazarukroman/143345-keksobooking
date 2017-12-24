'use strict';

(function () {
  window.form = {
    /** 
     * Удаляем атрибут disabled с полей формы
     */
    removeDisabled: function () {
      for (var m = 0; m < formFieldset.length; m++) {
        formFieldset[m].removeAttribute('disabled');
      }
    },

    noticeForm: document.querySelector('.notice__form'),
  };

  var formFieldset = window.form.noticeForm.querySelectorAll('fieldset');
  /**
   * Добавляем артибут disabled для всех полей формы
   */
  for (var g = 0; g < formFieldset.length; g++) {
    formFieldset[g].setAttribute('disabled', 'disabled');
  }

  var title = document.querySelector('#title');
  /**
   * Обработчик событий для "Заголовка объявления"
   * Если сообщение сообщение слишком короткое, длинное или не значение пропущено
   * То у инпута border становится красным
   * Если полве валидное, то удаляется атрибут style
   */
  title.addEventListener('invalid', function () {
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
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  /**
   * Обработчик события – изменение селекта Время заезда
   */
  timeIn.addEventListener('change', timeInChangeHandler);

  /**
   * Обработчик события – изменение селекта Время выезда
   */
  timeOut.addEventListener('change', timeOutChangeHandler);

  /**
   * Функция, при изменении селекта Время заезда, селект Время выезда становится таким же
   * @param  {[number]} timeInCount [Число обозначающее количество индексов в селекте]
   */
  var timeInChangeHandler = function () {
    timeOut.options[timeIn.options.selectedIndex].selected = true;
  };

  /**
   * Функция, при изменении селекта Время выезда, селект Время заезда становится таким же
   * @param  {[number]} timeOutCount [Число обозначающее количество индексов в селекте]
   */
  var timeOutChangeHandler = function () {
    timeIn.options[timeOut.options.selectedIndex].selected = true;
  };

  var accomondationType = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var accomondationTypes = {
    flat: 0,
    bungalo: 1,
    house: 2,
    palace: 3
  };
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;

  /**
   * Обработчик событий для "Цена за ночь"
   * Если число слишком маленькое, большое или вводится не число
   * То у инпута border становится красным
   * Если полве валидное, то удаляется атрибут style
   */
  priceInput.addEventListener('invalid', function () {
    if (priceInput.validity.rangeUnderflow) {
      title.setAttribute('style', 'border-color: red');
    } else if (priceInput.validity.rangeOverflow) {
      title.setAttribute('style', 'border-color: red');
    } else if (priceInput.validity.typeMismatch) {
      title.setAttribute('style', 'border-color: red');
    } else {
      title.removeAttribute('style');
    }
  });
  /**
   * Обработчик события - при изменении селекта "Тип жилья" меняется минимальная сумма за ночь
   */
  accomondationType.addEventListener('change', accomondationTypeChangeHandler);

  /**
   * Функция которая проверяет выбранное значение в селекте "Тип жилья"
   * и ставит минимальную "Цена за ночь" в зависимости от "Тип жилья"
   */
  var accomondationTypeChangeHandler = function () {
    if (accomondationType.options.selectedIndex === accomondationTypes.bungalo) {
      priceInput.setAttribute('min', BUNGALO_MIN_PRICE);
    } else if (accomondationType.options.selectedIndex === accomondationTypes.flat) {
      priceInput.setAttribute('min', FLAT_MIN_PRICE);
    } else if (accomondationType.options.selectedIndex === accomondationTypes.house) {
      priceInput.setAttribute('min', HOUSE_MIN_PRICE);
    } else if (accomondationType.options.selectedIndex === accomondationTypes.palace) {
      priceInput.setAttribute('min', PALACE_MIN_PRICE);
    }
  };

  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var rooms = {
    oneRoom: 0,
    twoRooms: 1,
    threeRooms: 2,
    hundredRooms: 3
  };
  var guests = {
    threePeople: 0,
    twoPeople: 1,
    oneMan: 2,
    notForPeope: 3
  };
  /**
   * Обработчик события - при изменении селекта "Кол-во комнат" меняется селект "Количество мест"
   */
  roomNumber.addEventListener('change', roomNumberChangeHandler);

  /**
   * Обработчик события - при изменении селекта "Количество мест" меняется селект "Кол-во комнат"
   */
  roomCapacity.addEventListener('change', roomCapacityChangeHandler);

  /**
   * Функция которая проверяет выбранное значение в селекте "Кол-во комнат"
   * и ставит в селекте "Количество мест" необходимый индекс
   */
  var roomNumberChangeHandler = function () {
    if (roomNumber.options.selectedIndex === rooms.oneRoom) {
      roomCapacity.selectedIndex = guests.oneMan;
    } else if (roomNumber.options.selectedIndex === rooms.twoRooms) {
      roomCapacity.selectedIndex = guests.twoPeople;
    } else if (roomNumber.options.selectedIndex === rooms.threeRooms) {
      roomCapacity.selectedIndex = guests.threePeople;
    } else if (roomNumber.options.selectedIndex === rooms.hundredRooms) {
      roomCapacity.selectedIndex = guests.notForPeope;
    }
  };

  /**
   * Функция которая проверяет выбранное значение в селекте "Количество мест"
   * и ставит в селекте "Кол-во комнат" необходимый индекс
   */
  var roomCapacityChangeHandler = function () {
    if (roomCapacity.selectedIndex === guests.oneMan) {
      roomNumber.options.selectedIndex = rooms.oneRoom;
    } else if (roomCapacity.selectedIndex === guests.twoPeople) {
      roomNumber.options.selectedIndex = rooms.twoRooms;
    } else if (roomCapacity.selectedIndex === guests.threePeople) {
      roomNumber.options.selectedIndex = rooms.threeRooms;
    } else if (roomCapacity.selectedIndex === guests.notForPeope) {
      roomNumber.options.selectedIndex = rooms.hundredRooms;
    }
  };
})();

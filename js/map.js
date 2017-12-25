'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    /**
     * Функция для
     * Удаления затемнения карты
     * Отрисовывания объявления
     * Удаления атрибута disabled с полей формы
     */
    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      map.classList.remove('map--faded');
      mapPins.appendChild(window.pin.getPinsFragment);
      window.form.removeDisabledFieldset();
      window.form.noticeForm.classList.remove('notice__form--disabled');

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
  }

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
})();

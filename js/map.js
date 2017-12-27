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

      var MIN_COORD_Y = 100;
      var MAX_COORD_Y = 500;

      if (startCoords.y < MIN_COORD_Y) {
        mainPin.style.top = MIN_COORD_Y + 'px';
      } else if (startCoords.y > MAX_COORD_Y) {
        mainPin.style.top = MAX_COORD_Y + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    /**
     * Функция для
     * Удаления затемнения карты
     * Отрисовывания объявления
     * Удаления атрибута disabled с полей формы
     * Удаление обработчиков событий с mousemove, mouseup
     * @param  {[event]} upEvt [Событие]
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
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);
})();

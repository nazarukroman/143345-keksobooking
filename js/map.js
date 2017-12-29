'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  /**
   * Функция перетаскивания главной метки
   * @param  {[event]} evt [событие]
   */
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

      var MIN_COORD_X = 100;
      var MAX_COORD_X = 1100;

      if (startCoords.x < MIN_COORD_X) {
        mainPin.style.left = MIN_COORD_X + 'px';
      } else if (startCoords.x > MAX_COORD_X) {
        mainPin.style.left = MAX_COORD_X + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.setAddress(mainPin.style.top, mainPin.style.left);
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
      // window.pin.getPinsFragment();
      window.backend.download(window.pin.getPinsFragment);
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

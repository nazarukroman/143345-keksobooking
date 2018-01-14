'use strict';

(function () {
  var PIN_HALF_HEIGHT = 42;
  var PIN_HALF_WIDTH = 31;
  var MIN_COORD = {
    X: 300 - PIN_HALF_WIDTH,
    Y: 100 - PIN_HALF_HEIGHT
  };
  var MAX_COORD = {
    X: 900 - PIN_HALF_WIDTH,
    Y: 500 - PIN_HALF_HEIGHT
  };
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var firstMove = true;
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

      var coordinates = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (coordinates.x < MIN_COORD.X) {
        coordinates.x = MIN_COORD.X;
      } else if (coordinates.x > MAX_COORD.X) {
        coordinates.x = MAX_COORD.X;
      }

      if (coordinates.y < MIN_COORD.Y) {
        coordinates.y = MIN_COORD.Y;
      } else if (coordinates.y > MAX_COORD.Y) {
        coordinates.y = MAX_COORD.Y;
      }

      mainPin.style.top = coordinates.y + 'px';
      mainPin.style.left = coordinates.x + 'px';

      window.form.setAddress(coordinates.x, coordinates.y);
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
      if (firstMove) {
        window.pin.getPinsFragment(window.data.getShortObject());
        firstMove = false;
      }
      window.form.noticeForm.classList.remove('notice__form--disabled');
      window.form.removeDisabledFieldset();

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
  };

  mainPin.addEventListener('mousedown', mainPinMousedownHandler);

  window.map = {
    mapSection: map,
  };
})();

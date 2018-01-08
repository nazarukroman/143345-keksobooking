'use strict';

(function () {
  var MIN_COORD_X = 100;
  var MAX_COORD_X = 1100;
  var MIN_COORD_Y = 100;
  var MAX_COORD_Y = 600;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  /**
   * Функция перетаскивания главной метки
   * @param  {[event]} evt [событие]
   */
  var mainPinMousedownHandler = function (evt) {
    evt.preventDefault();

    var setLimitCoordX = function (pinX) {
      if (pinX < MIN_COORD_X) {
        return MIN_COORD_X;
      } else if (pinX > MAX_COORD_X) {
        return MAX_COORD_X;
      }
      return pinX;
    };

    var setLimitCoordY = function (pinY) {
      if (pinY < MIN_COORD_Y) {
        return MIN_COORD_Y;
      } else if (pinY > MAX_COORD_Y) {
        return MAX_COORD_Y;
      }
      return pinY;
    };

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

      mainPin.style.top = setLimitCoordY(mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = setLimitCoordX(mainPin.offsetLeft - shift.x) + 'px';

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
      window.pin.getPinsFragment(window.data.getShortObject());
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

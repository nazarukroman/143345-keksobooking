'use strict';

(function () {
  var MIN_COORD = {
    X: 100,
    Y: 100
  };
  var MAX_COORD = {
    X: 1100,
    Y: 500
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

    var setLimitCoordX = function (pinX) {
      if (pinX < MIN_COORD.X) {
        return MIN_COORD.X;
      } else if (pinX > MAX_COORD.X) {
        return MAX_COORD.X;
      }
      return pinX;
    };

    var setLimitCoordY = function (pinY) {
      if (pinY < MIN_COORD.Y) {
        return MIN_COORD.Y;
      } else if (pinY > MAX_COORD.Y) {
        return MAX_COORD.Y;
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

      var topCoord = mainPin.offsetTop - shift.y;
      var leftCoord = mainPin.offsetLeft - shift.x;

      mainPin.style.top = setLimitCoordY(topCoord) + 'px';
      mainPin.style.left = setLimitCoordX(leftCoord) + 'px';

      window.form.setAddress(leftCoord, topCoord);
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

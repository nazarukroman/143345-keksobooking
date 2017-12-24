'use strict';

var map = document.querySelector('.map');


var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
/**
 * Функция для
 * Удаления затемнения карты
 * Отрисовывания объявления
 * Удаления атрибута disabled с полей формы
 */
var mainPinMouseupHandler = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(window.pin.fragment());
  window.form.removeDisabled();
  window.form.noticeForm.classList.remove('notice__form--disabled');
};

/**
 * Обработчик события(нажатия мышкой) по главной метке на карте
 */
mainPin.addEventListener('mouseup', mainPinMouseupHandler);

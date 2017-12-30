'use strict';

(function () {
  var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
  /**
   * [Отрисовываем метки на карте + устанавливаем обработчик событий для нажатия по метке]
   * @param  {[object]} offerObject [Объект с индексом]
   * @param  {[number]} count          [Индекс]
   * @return {[type]}                [Сгенерированные метки]
   */
  var renderPoints = function (offerObject, count) {
    var mapPoint = buttonTemplate.cloneNode(true);
    mapPoint.style.left = offerObject.location.x + 'px';
    mapPoint.style.top = offerObject.location.y + 'px';
    mapPoint.querySelector('img').src = offerObject.author.avatar;
    mapPoint.setAttribute('data-id', count);

    mapPoint.addEventListener('click', mapPointClickHandler);

    return mapPoint;
  };

  var mapPointClickHandler = function (evt) {
    activePins();
    pinClickHandler(evt);
  };
  var getPinsFragment = function (offers) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');
    var onePin = mapPins.querySelector('.map__pin');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    // var MAX_PINS_COUNT = 5;
    /**
     * Записываем все метки во fragment
     */
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPoints(offers[i], i));
    }
    if (mapPins.contains(onePin)) {
      for (var j = 0; j < mapPin.length; j++) {
        mapPins.removeChild(mapPin[j]);
      }
    }
    mapPins.appendChild(fragment);
  };

  var updatePins = function (newVal) {
    var newType = window.offersObject.filter(function (obj) {
      return obj.offer.type === newVal;
    });
    getPinsFragment(newType);
  };

  /**
   * Удаляем активный класс у метки
   */
  var activePins = function () {
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  /**
   * Находим дата-атрибут у метки на которую нажали
   * Затем добавляется или заменяется объявление с таким же дата-атрибутом на карту (функция renderAdSection)
   * @param  {[event]} evt [Событие]
   * @param  {[object]} offersObject [Объект с данными с сервера]
   */
  var pinClickHandler = function (evt) {
    var dataId = evt.currentTarget.getAttribute('data-id');
    window.card.renderAdSection(dataId);
    evt.currentTarget.classList.add('map__pin--active');
  };

  window.pin = {
    getPinsFragment: getPinsFragment,
    activePins: activePins,
    updatePins: updatePins
  };
})();

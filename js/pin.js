'use strict';

(function () {
  var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
  /**
   * [Отрисовываем метки на карте + устанавливаем обработчик событий для нажатия по метке]
   * @param  {[object]} offerObject [Требуемый объект из getPinsFragment]
   * @param  {[number]} count          [Индекс]
   * @return {[type]}                [Сгенерированные метки]
   */
  var renderPoints = function (offerObject, count) {
    var mapPoint = buttonTemplate.cloneNode(true);
    mapPoint.style.left = offerObject.location.x + 'px';
    mapPoint.style.top = offerObject.location.y + 'px';
    mapPoint.querySelector('img').src = offerObject.author.avatar;
    mapPoint.setAttribute('data-id', count);

    var rangeObject = offerObject;

    /**
     * Обработчик на клик по метке на карте
     * @param  {[event]} evt [Событие]
     */
    var mapPointClickHandler = function (evt) {
      activePins();
      pinClickHandler(evt, rangeObject);
    };

    mapPoint.addEventListener('click', mapPointClickHandler);
    return mapPoint;
  };

  var getPinsFragment = function (offerObject) {
    window.mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    /**
     * Записываем все метки во fragment
     */
    for (var i = 0; i < offerObject.length; i++) {
      fragment.appendChild(renderPoints(offerObject[i], i));
    }

    window.mapPins.appendChild(fragment);
    window.mapPin = document.querySelectorAll('.map__pin');
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
   * @param  {[object]} offerObject [Массив с отфильтрованными данными]
   */
  var pinClickHandler = function (evt, offerObject) {
    var dataId = evt.currentTarget.getAttribute('data-id');
    window.card.renderAdSection(offerObject, dataId);
    evt.currentTarget.classList.add('map__pin--active');
  };

  window.pin = {
    getPinsFragment: getPinsFragment,
    activePins: activePins,
  };
})();

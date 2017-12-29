'use strict';

(function () {
  var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
  /**
   * [Отрисовываем метки на карте + устанавливаем обработчик событий для нажатия по метке]
   * @param  {[object]} secondAdObject [Объект с индексом]
   * @param  {[number]} count          [Индекс]
   * @return {[type]}                [Сгенерированные метки]
   */
  var renderPoints = function (secondAdObject, count) {
    var mapPoint = buttonTemplate.cloneNode(true);
    mapPoint.style.left = secondAdObject.location.x + 'px';
    mapPoint.style.top = secondAdObject.location.y + 'px';
    mapPoint.querySelector('img').src = secondAdObject.author.avatar;
    mapPoint.setAttribute('data-id', count);

    mapPoint.addEventListener('click', mapPointClickHandler);

    return mapPoint;
  };

  var mapPointClickHandler = function (evt) {
    activePins();
    pinClickHandler(evt);
  };

  // var getPinsFragment = function () {
  //   var fragment = document.createDocumentFragment();
  //   var mapPins = document.querySelector('.map__pins');
  //   *
  //    * Записываем все метки во fragment
     
  //   for (var i = 0; i < window.data.getOffers.length; i++) {
  //     fragment.appendChild(renderPoints(window.data.getOffers[i], i));
  //   }
  //   mapPins.appendChild(fragment);
  // };

  var getPinsFragment = function (offers) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');
    /**
     * Записываем все метки во fragment
     */
    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(renderPoints(offers[i], i));
    }
    mapPins.appendChild(fragment);
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
   */
  var pinClickHandler = function (evt) {
    var dataId = event.currentTarget.getAttribute('data-id');
    window.backend.download(window.card.renderAdSection, dataId);
    // window.card.renderAdSection(dataId);
    evt.currentTarget.classList.add('map__pin--active');
  };

  window.pin = {
    getPinsFragment: getPinsFragment,
    activePins: activePins
  };
})();

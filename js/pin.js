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

    mapPoint.addEventListener('click', function (evt) {
      window.pin.activePins();
      window.pin.pinClickHandler(evt);
    });

    return mapPoint;
  };

  window.pin = {
    fragment: function () {
      var fragment = document.createDocumentFragment();
      // var similarAdverts = window.data();
      /**
       * Записываем все метки во fragment
       */
      for (var k = 0; k < window.data().length; k++) {
        fragment.appendChild(renderPoints(window.data()[k], k));
      }
      return fragment;
    },

    /**
     * Функция для обработчика на Esc
     * вешает класс 'hidden' на popup
     * удаляет активный класс у метки
     * @param  {[event]} event [Событие]
     */
    popupEscHandler: function (event) {
      window.card.closePopupButtonKeydownHandler(event);
      window.pin.activePins();
    },

    /**
     * Удаляем активный класс у метки
     */
    activePins: function () {
      var pinActive = document.querySelector('.map__pin--active');
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
    },

    /**
     * Находим дата-атрибут у метки на которую нажали
     * Затем добавляется или заменяется объявление с таким же дата-атрибутом на карту (функция renderAdSection)
     * @param  {[event]} event1 [Событие]
     */
    pinClickHandler: function (event1) {
      var dataId = event.currentTarget.getAttribute('data-id');
      window.card.renderAdSection(dataId);
      event1.currentTarget.classList.add('map__pin--active');
    }
  };
})();

'use strict';

(function () {
  var ESC_KEYCODE = 27;

  /**
   * Генерируем спиоск удобств(features) из объекта similarAdverts.offer.features
   * @param  {[object]} firstAdObject [объект с индексом]
   * @return {[fragment]}               [Фрагмент с новым списком]
   */
  var getFeaturesHtml = function (firstAdObject) {
    var ulFragment = document.createDocumentFragment();
    var newList = document.createElement('ul');
    newList.className = 'popup__features';

    for (var j = 0; j < firstAdObject.offer.features.length; j++) {
      var newElementList = document.createElement('li');
      newElementList.className = 'feature ' + 'feature--' + firstAdObject.offer.features[j];

      ulFragment.appendChild(newElementList);
    }

    newList.appendChild(ulFragment);
    return newList;
  };

  var pinTemplate = document.querySelector('template').content.querySelector('.map__card');
  /**
   * Заполняем объявление на карте
   * @param  {[object]} thirdAdObject [Объект с индексом]
   * @return {[type]}               [Сгенерированные объявления]
   */
  var renderAdvert = function (thirdAdObject) {
    var advertNode = pinTemplate.cloneNode(true);

    advertNode.querySelector('.popup__avatar').src = thirdAdObject.author.avatar;
    advertNode.querySelector('h3').textContent = thirdAdObject.offer.title;
    advertNode.querySelector('small').textContent = thirdAdObject.offer.address;
    advertNode.querySelector('.popup__price').textContent = thirdAdObject.offer.price + ' ₽/ночь';
    advertNode.querySelector('h4').textContent = thirdAdObject.offer.type;
    advertNode.querySelectorAll('p')[2].textContent = thirdAdObject.offer.rooms + ' комнаты для ' + thirdAdObject.offer.guests + ' гостей';
    advertNode.querySelectorAll('p')[3].textContent = 'Заезд после ' + thirdAdObject.offer.checkin + ' , выезд до ' + thirdAdObject.offer.checkout;
    advertNode.querySelectorAll('p')[4].textContent = thirdAdObject.offer.description;
    advertNode.querySelector('.popup__features').replaceWith(getFeaturesHtml(thirdAdObject));

    return advertNode;
  };

  var mapSection = document.querySelector('.map');
  /**
   * Закрываем объявление по нажатию на крестик или по нажатию на Esc
   */
  var popupCloseHandlers = function () {
    var popup = mapSection.querySelector('.popup');
    var closePopupButton = popup.querySelector('.popup__close');

    document.addEventListener('keydown', window.pin.popupEscHandler);
    closePopupButton.addEventListener('click', closePopupButtonClickHandler);
  };

  var closePopupButtonClickHandler = function () {
    closePopup();
    window.pin.activePins();
  };
  /**
   * Функция которая скрывает объявление
   */
  var closePopup = function () {
    var card = mapSection.querySelector('.map__card');
    card.classList.add('hidden');
    document.removeEventListener('keydown', window.pin.popupEscHandler);
  };

  window.card = {
    /**
     * Функция вставляет объявление в html
     * Если какое-то объявление уже вставлено, то заменяет его на другое объявление, которое вызвал пользователь
     * @param  {[number]} count [индекс]
     */
    renderAdSection: function (count) {
      var filterContainer = document.querySelector('.map__filters-container');
      var card = mapSection.querySelector('.map__card');
      if (mapSection.contains(card)) {
        mapSection.replaceChild(renderAdvert(window.data()[count]), card);
      } else {
        mapSection.insertBefore(renderAdvert(window.data()[count]), filterContainer);
      }
      popupCloseHandlers();
    },

    closePopupButtonKeydownHandler: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    }
  };
})();

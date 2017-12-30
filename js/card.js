'use strict';

(function () {
  /**
   * Генерируем спиоск удобств(features) из объекта similarAdverts.offer.features
   * @param  {[object]} offerObject [объект с индексом]
   * @return {[fragment]}               [Фрагмент с новым списком]
   */
  var getFeaturesHtml = function (offerObject) {
    var listFragment = document.createDocumentFragment();
    var newList = document.createElement('ul');
    newList.className = 'popup__features';
    for (var i = 0; i < offerObject.offer.features.length; i++) {
      var newElementList = document.createElement('li');
      newElementList.className = 'feature ' + 'feature--' + offerObject.offer.features[i];
      listFragment.appendChild(newElementList);
    }
    newList.appendChild(listFragment);
    return newList;
  };

  var adTemplate = document.querySelector('template').content.querySelector('.map__card');
  /**
   * Заполняем объявление на карте
   * @param  {[object]} offerObject [Объект с индексом]
   * @return {[type]}               [Сгенерированные объявления]
   */
  var getAdvert = function (offerObject) {
    var advertNode = adTemplate.cloneNode(true);
    // window.accomondationType = offerObject.offer.type;
    // var typesMap = window.data.typesRusMap;

    advertNode.querySelector('.popup__avatar').src = offerObject.author.avatar;
    advertNode.querySelector('h3').textContent = offerObject.offer.title;
    advertNode.querySelector('small').textContent = offerObject.offer.address;
    advertNode.querySelector('.popup__price').textContent = offerObject.offer.price + ' ₽/ночь';
    advertNode.querySelector('h4').textContent = offerObject.offer.type;
    advertNode.querySelectorAll('p')[2].textContent = offerObject.offer.rooms + ' комнаты для ' + offerObject.offer.guests + ' гостей';
    advertNode.querySelectorAll('p')[3].textContent = 'Заезд после ' + offerObject.offer.checkin + ' , выезд до ' + offerObject.offer.checkout;
    advertNode.querySelectorAll('p')[4].textContent = offerObject.offer.description;
    advertNode.querySelector('.popup__features').replaceWith(getFeaturesHtml(offerObject));

    return advertNode;
  };

  var renderAdSection = function (count) {
    var filterContainer = document.querySelector('.map__filters-container');
    var card = mapSection.querySelector('.map__card');
    if (mapSection.contains(card)) {
      mapSection.replaceChild(getAdvert(window.offersObject[count]), card);
    } else {
      mapSection.insertBefore(getAdvert(window.offersObject[count]), filterContainer);
    }
    popupCloseHandlers();
  };

  var mapSection = document.querySelector('.map');
  /**
   * Закрываем объявление по нажатию на крестик или по нажатию на Esc
   */
  var popupCloseHandlers = function () {
    var popup = mapSection.querySelector('.popup');
    var closePopupButton = popup.querySelector('.popup__close');

    document.addEventListener('keydown', closePopupButtonKeydownHandler);
    closePopupButton.addEventListener('click', closePopup);
  };

  /**
   * Функция которая скрывает объявление
   */
  var closePopup = function () {
    var card = mapSection.querySelector('.map__card');
    card.classList.add('hidden');
    document.removeEventListener('keydown', closePopupButtonKeydownHandler);
    window.pin.activePins();
  };

  var ESC_KEYCODE = 27;
  var closePopupButtonKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  window.card = {
    renderAdSection: renderAdSection,
    closePopupButtonKeydownHandler: closePopupButtonKeydownHandler,
    getAdvert: getAdvert
  };
})();

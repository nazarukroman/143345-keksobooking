'use strict';

var map = document.querySelector('.map');
var flats = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var typesRusMap = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 100;
var MAX_Y = 500;
var OBJECT_LENGHT = 8;
var ESC_KEYCODE = 27;

var noticeForm = document.querySelector('.notice__form');
var formFieldset = noticeForm.querySelectorAll('fieldset');
/**
 * Добавляем артибут disabled для всех полей формы
 */
for (var g = 0; g < formFieldset.length; g++) {
  formFieldset[g].setAttribute('disabled', 'disabled');
}

/**
 * Находим случайное число из диапазона
 * @method
 * @param  {[number]} min [Минимальный диапазон]
 * @param  {[number]} max [Максимальный диапазон]
 * @return {[number]} [Случайное число]
 */
var getRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max + 1 - min));
};

/**
 * Находим случайное значение из массива
 * @method
 * @param  {[array]} array [Массив из которого выбираем значение]
 * @return {[string]} [Полученное значение из массива]
 */
var getRandomArrayValue = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  var arrayValue = array[rand];
  return arrayValue;
};

/**
 * Находим массив случайной длины из массива features
 * @method
 * @return {[array]} [Полученный массив]
 */
var getRandomFeatures = function () {
  var newFeatures = features.slice(getRandomNumber(0, features.length - 2));
  return newFeatures;
};

/**
 * Находим случайный адресс
 * @method
 * @return {[object]} [Возвращаем объект с координатами x, y]
 */
var getRandomAddress = function () {
  return {
    'x': getRandomNumber(MIN_X, MAX_X),
    'y': getRandomNumber(MIN_Y, MAX_Y)
  };
};

/**
 * Функция которая генерирует объект
 * @method
 * @param  {[number]} a [Индекс]
 * @return {[object]} [Типовой объект]
 */
var setTypicalObject = function (a) {
  var location = getRandomAddress();
  var advertObject = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + [a + 1] + '.png'
    },

    'offer': {
      'title': flats[a],
      'address': location.x + ', ' + location.y,
      'price': getRandomNumber(1000, 1000000),
      'type': typesRusMap[getRandomArrayValue(types)],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(5, 50),
      'checkin': getRandomArrayValue(times),
      'checkout': getRandomArrayValue(times),
      'features': getRandomFeatures(),
      'description': '',
      'photos': []
    },

    'location': {
      'x': location.x,
      'y': location.y
    }
  };
  return advertObject;
};

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

/**
 * Массив с объектами, в которых лежит информация для объявлений
 * @type {Array}
 */
var similarAdverts = [];
for (var i = 0; i < OBJECT_LENGHT; i++) {
  similarAdverts[i] = setTypicalObject(i);
}

/**
 * Удаляем если есть класс map__pin--active у метки
 * и добавляем класс map__pin--active на ту метку, на которую нажали
 * @param  {[event]} event [пойманное событие]
 */
var activePins = function (event) {
  var pinActive = document.querySelector('.map__pin--active');
  if (pinActive) {
    pinActive.classList.remove('map__pin--active');
  }
  var dataId = event.currentTarget.getAttribute('data-id');
  renderAdSection(dataId);
  event.currentTarget.classList.add('map__pin--active');
};

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
    activePins(evt);
  });

  return mapPoint;
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


var fragment = document.createDocumentFragment();
/**
 * Записываем все метки во fragment
 */
for (var k = 0; k < similarAdverts.length; k++) {
  fragment.appendChild(renderPoints(similarAdverts[k], k));
}

/**
 * Удаляем атрибут disabled с полей формы
 */
var removeDisabled = function () {
  for (var m = 0; m < formFieldset.length; m++) {
    formFieldset[m].removeAttribute('disabled');
  }
};


var mapSection = document.querySelector('.map');
/**
 * Функция вставляет объявление в html
 * Если какое-то объявление уже вставлено, то заменяет его на другое объявление, которое вызвал пользователь
 * @param  {[number]} count [индекс]
 */
var renderAdSection = function (count) {
  var filterContainer = document.querySelector('.map__filters-container');
  var card = mapSection.querySelector('.map__card');
  if (mapSection.contains(card)) {
    mapSection.replaceChild(renderAdvert(similarAdverts[count]), card);
  } else {
    mapSection.insertBefore(renderAdvert(similarAdverts[count]), filterContainer);
  }
  popupCloseHandlers();
};

var popupCloseHandlers = function () {
  var popup = mapSection.querySelector('.popup');
  var closePopupButton = popup.querySelector('.popup__close');

  document.addEventListener('keydown', function (evt) {
    popupCloseEscHandler(evt);
    checkPinActive();
  });
  closePopupButton.addEventListener('click', function () {
    closePopup();
    checkPinActive();
  });
};

var checkPinActive = function () {
  var pinActive2 = document.querySelector('.map__pin--active');
  var mapHidden = document.querySelector('.map__card');
  if (mapHidden.classList.contains('hidden')) {
    pinActive2.classList.remove('map__pin--active');
  }
};

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
  mapPins.appendChild(fragment);
  removeDisabled();
};

/**
 * Обработчик события(нажатия мышкой) по главной метке на карте
 */
mainPin.addEventListener('mouseup', mainPinMouseupHandler);

/**
 * 
 */
var closePopup = function () {
  var card = mapSection.querySelector('.map__card');
  card.classList.add('hidden');
  document.removeEventListener('keydown', popupCloseEscHandler);
};

var popupCloseEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

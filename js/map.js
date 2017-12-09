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
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__card');
var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
var noticeForm = document.querySelector('.notice__form');
var formFieldset = noticeForm.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');



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
var randomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max + 1 - min));
};

/**
 * Находим случайное значение из массива
 * @method
 * @param  {[array]} array [Массив из которого выбираем значение]
 * @return {[string]} [Полученное значение из массива]
 */
var randomArrayValue = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  var arrayValue = array[rand];
  return arrayValue;
};

/**
 * Находим массив случайной длины из массива features
 * @method
 * @return {[array]} [Полученный массив]
 */
var randomFeatures = function () {
  var newFeatures = features.slice(randomNumber(0, features.length - 2));
  return newFeatures;
};

/**
 * Находим случайный адресс
 * @method
 * @return {[object]} [Возвращаем объект с координатами x, y]
 */
var randomAddress = function () {
  return {
    'x': randomNumber(MIN_X, MAX_X),
    'y': randomNumber(MIN_Y, MAX_Y)
  };
};

/**
 * Функция которая генерирует объект
 * @method
 * @param  {[number]} a [Индекс]
 * @return {[object]} [Типовой объект]
 */
var typicalObject = function (a) {
  var location = randomAddress();
  var someObject = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + [a + 1] + '.png'
    },

    'offer': {
      'title': flats[a],
      'address': location.x + ', ' + location.y,
      'price': randomNumber(1000, 1000000),
      'type': typesRusMap[randomArrayValue(types)],
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(5, 50),
      'checkin': randomArrayValue(times),
      'checkout': randomArrayValue(times),
      'features': randomFeatures(),
      'description': '',
      'photos': []
    },

    'location': {
      'x': location.x,
      'y': location.y
    }
  };
  return someObject;
};

/**
 * Генерируем спиоск удобств(features) из объекта similarAdverts.offer.features
 * @method
 * @param  {[type]} a [Индекс]
 * @return {[type]} [Фрагмент с сгенирированным списком]
 */
var featuresHtml = function (a) {
  var ulFragment = document.createDocumentFragment();

  var newList = document.createElement('ul');
  newList.className = 'popup__features';

  for (var j = 0; j < similarAdverts[a].offer.features.length; j++) {
    var newElementList = document.createElement('li');
    newElementList.className = 'feature ' + 'feature--' + similarAdverts[a].offer.features[j];

    ulFragment.appendChild(newElementList);
  }

  newList.appendChild(ulFragment);
  return newList;
};

var similarAdverts = [];
for (var i = 0; i < OBJECT_LENGHT; i++) {
  similarAdverts[i] = typicalObject(i);
}

/**
 * Отрисовываем метки на карте
 * @method
 * @return {[type]} [Сгенерированные метки]
 */
var renderPoints = function (f) {
  var mapPoint = buttonTemplate.cloneNode(true);
  mapPoint.style.left = similarAdverts[f].location.x + 'px';
  mapPoint.style.left = similarAdverts[f].location.y + 'px';
  mapPoint.querySelector('img').src = similarAdverts[f].author.avatar;

  return mapPoint;
};

/**
 * Заполняем объявление на карте
 * @method
 * @return {[type]} [Сгенерированные объявления]
 */
var renderPin = function (l) {
  var somePin = pinTemplate.cloneNode(true);

  somePin.querySelector('.popup__avatar').src = similarAdverts[l].author.avatar;
  somePin.querySelector('h3').textContent = similarAdverts[l].offer.title;
  somePin.querySelector('small').textContent = similarAdverts[l].offer.address;
  somePin.querySelector('.popup__price').textContent = similarAdverts[l].offer.price + '&#x20bd;' + '/ночь';
  somePin.querySelector('h4').textContent = similarAdverts[l].offer.type;
  somePin.querySelectorAll('p')[2].textContent = similarAdverts[l].offer.rooms + ' комнаты для ' + similarAdverts[l].offer.guests + ' гостей';
  somePin.querySelectorAll('p')[3].textContent = 'Заезд после ' + similarAdverts[l].offer.checkin + ' , выезд до ' + similarAdverts[l].offer.checkout;
  somePin.querySelectorAll('p')[4].textContent = similarAdverts[l].offer.description;
  somePin.querySelector('.popup__features').replaceWith(featuresHtml(l));

  return somePin;
};

/**
 * Записываем все объявления во fragment
 */
for (var k = 0; k < similarAdverts.length; k++) {
  fragment.appendChild(renderPin(k));
  fragment.appendChild(renderPoints(k));
}

/**
 * Удаляем атрибут disabled с полей формы
 */
var removeDisabled = function () {
  for (var g = 0; g < formFieldset.length; g++) {
    formFieldset[g].removeAttribute('disabled');
  }
};

/**
 * Удаляем затемнение карты
 * Отрисовываем объявления
 * Удаляем атрибут disabled с полей формы
 */
var mainPinMouseupHandler = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragment);
  removeDisabled();
};

/**
 * Находим все метки
 */
var findPins = function () {
  var pins = document.querySelectorAll('.map__pin');

  return pins;
};

/**
 * Находим все карточки
 */
var findCards = function () {
  var cards = document.querySelectorAll('.map__card');

  return cards; 
};

/**
 * Скрываем все карточки с карты
 * @param  {Входной массив}
 */
var hideCards = function (cardsArray) {
  for (var i = 0; i < cardsArray.length; i++) {
   cardsArray[i].classList.add('hidden');
  }
};


/**
 * Хотел добавлять класс map__pin--active меткам в этой функции
 * @param  {array} Массив с найденными метками
 */
var activePins = function (pinsArray) {
  pinsArray[i].classList.add('map__pin--active');
};

/**
 * Хотел при клике на одну из меток добавить ей класс map__pin--active
 * @param  {array} Массив с найденными метками
 */
var mapPinClickHandler = function (pinsArray) {
  for (var i = 0; i < pinsArray.length; i++) {
   pinsArray[i].addEventListener('click', activePins(pinsArray));
  }
};

/**
 * Проверял что выводит evt
 */
// var mapPinsClickHandler = function (evt) {
//   console.log(evt);
// };


mainPin.addEventListener('mouseup', function () {
  mainPinMouseupHandler();
  hideCards(findCards());
  // mapPinClickHandler(findPins());
  // mapPinsClickHandler();

  // var test = findPins();

  // for (var i = 0; i < test.length; i++) {
  //   test[i].addEventListener('click', mapPinsClickHandler);
  // }
});








'use strict';
var similarAdverts = [];
var map = document.querySelector('.map');
var flats = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'};
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__card');
var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');

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
 * Копируем массив facilities, сортируем его случайным образом, выбираем случайную длину массива от 1 до 6
 * @method
 * @return {[array]} [Возвращаем новый массив]
 */
var randomFeatures = function () {

  /**
   * [Число для случайного сравнения]
   * @method
   * @param  {[type]} a [description]
   * @param  {[type]} b [description]
   * @return {[type]} [description]
   */
  var compareRandom = function (a, b) {
    return Math.random() - 0.5;
  };

  var newFeatures = features.slice(0);
  newFeatures.sort(compareRandom);
  newFeatures.length = randomNumber(1, 5);
  // var stringFeatures = newFeatures.join(', ');

  return newFeatures;
};

var someX;
var someY;
var addressString;
var randomAddress = function () {
  someX = randomNumber(300, 900);
  someY = randomNumber(100, 500);
  addressString = [someX, someY];

  return addressString;
};
randomAddress();

/**
 * Функция которая генерирует объект
 * @method
 * @param  {[number]} a [Индекс]
 * @return {[object]} [Типовой объект]
 */
var typicalObject = function (a) {
  var someObject = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + [a + 1] + '.png'
    },

    'offer': {
      'title': flats[a],
      'address': addressString.join(', '),
      'price': randomNumber(1000, 1000000),
      'type': randomArrayValue(Object.values(types)),
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(5, 50),
      'checkin': randomArrayValue(times),
      'checkout': randomArrayValue(times),
      'features': randomFeatures(),
      'description': '',
      'photos': []
    },

    'location': {
      'x': someX,
      'y': someY
    }
  };
  return someObject;
};

/**
 * Удаляем элементы списка popup__features
 * @method
 */
var removeCh = function () {
  for (var i = 0; i < 6; i++) {
    popupList.removeChild(elementList[i]);
  }
};

/**
 * Добавляем в html в popup__features список удобств из объекта similarAdverts.offer.features
 * @method
 */
var featuresHtml = function () {
  for (var j = 0; j < similarAdverts[i].offer.features.length; j++) {
    var elementListHtml = '<li class="feature feature--' + similarAdverts[i].offer.features[j] + '"></li>';
    popupList.insertAdjacentHTML('afterbegin', elementListHtml);
  }
};

for (var i = 0; i < 8; i++) {
  similarAdverts[i] = typicalObject(i);
}

map.classList.remove('map--faded');

for (var i = 0; i < similarAdverts.length; i++) {
  var mapPoint = buttonTemplate.cloneNode(true);
  mapPoint.style.left = similarAdverts[i].location.x + 'px';
  mapPoint.style.left = similarAdverts[i].location.y + 'px';
  mapPoint.querySelector('img').src = similarAdverts[i].author.avatar;

  mapPins.appendChild(mapPoint);
}

for (var i = 0; i < similarAdverts.length; i++) {
  var somePin = pinTemplate.cloneNode(true);
  var popupList = somePin.querySelector('.popup__features');
  var elementList = somePin.querySelectorAll('.popup__features .feature');

  somePin.querySelector('.popup__avatar').src = similarAdverts[i].author.avatar;
  somePin.querySelector('h3').textContent = similarAdverts[i].offer.title;
  somePin.querySelector('small').textContent = similarAdverts[i].offer.address;
  somePin.querySelector('.popup__price').textContent = similarAdverts[i].offer.price + '&#x20bd;/ночь';
  somePin.querySelector('h4').textContent = similarAdverts[i].offer.type;
  somePin.querySelectorAll('p')[2].textContent = similarAdverts[i].offer.rooms + ' комнаты для ' + similarAdverts[i].offer.guests + ' гостей';
  somePin.querySelectorAll('p')[3].textContent = 'Заезд после ' + similarAdverts[i].offer.checkin + ' , выезд до ' + similarAdverts[i].offer.checkout;
  removeCh();
  featuresHtml();
  somePin.querySelectorAll('p')[4].textContent = similarAdverts[i].offer.description;

  mapPins.appendChild(somePin);
}

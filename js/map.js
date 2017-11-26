'use strict';
var similarAdverts = [];
var map = document.querySelector('.map');
var flats = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var features = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'};
var facilities = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__card');

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

var someX;
var someY;
var addressString;
var randomAddress = function () {
  someX = randomNumber(300, 900);
  someY = randomNumber(100, 500);
  addressString = [someX, someY];

  return addressString;
}
randomAddress();

/**
 * Функция которая генерирует объект
 * @method
 * @return {[object]} [Типовой объект]
 */
var typicalObject = function (a) {
  var someObject = {
    'author': {
      'avatar': 'img/avatars/user' + '0' + [a + 1] + '.png'
    },

    'offer': {
      'title': flats[a],
      'address': addressString,
      'price': randomNumber(1000, 1000000),
      'type': randomArrayValue(Object.values(features)),
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(5, 50),
      'checkin': randomArrayValue(times),
      'checkout': randomArrayValue(times),
      'features': randomArrayValue(facilities),
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

for (var i = 0; i < 8; i++) {
  similarAdverts[i] = typicalObject(i);
};

map.classList.remove('map--faded');

for (var i = 0; i < similarAdverts.length; i++) {
  var somePin = pinTemplate.cloneNode(true);

  somePin.querySelector('.popup__avatar').src = similarAdverts[i].author.avatar;
  somePin.querySelector('h3').textContent = similarAdverts[i].offer.title;
  somePin.querySelector('small').textContent = similarAdverts[i].offer.address;
  somePin.querySelector('.popup__price').textContent = similarAdverts[i].offer.price + '&#x20bd;/ночь';
  somePin.querySelector('h4').textContent = similarAdverts[i].offer.type;
  somePin.querySelectorAll('p')[2].textContent = similarAdverts[i].offer.rooms + ' комнаты для ' + similarAdverts[i].offer.guests + ' гостей';
  somePin.querySelectorAll('p')[3].textContent = 'Заезд после ' + similarAdverts[i].offer.checkin + ' , выезд до ' + similarAdverts[i].offer.checkout;

  mapPins.appendChild(somePin);
};


// var renderPins = function () {
//   var somePin = pinTemplate.cloneNode();
//
//   return somePin;
// };

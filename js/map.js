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
var ESC_KEYCODE = 27;



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
  var advertObject = {
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
  return advertObject;
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

/**
 * Массив с объектами, в которых лежит информация для объявлений
 * @type {Array}
 */
var similarAdverts = [];
for (var i = 0; i < OBJECT_LENGHT; i++) {
  similarAdverts[i] = typicalObject(i);
}

/**
 * Удаляем если есть класс map__pin--active у метки
 * и добавляем класс map__pin--active на ту метку, на которую нажали
 * @param  {event} Событие
 */
var activePins = function (event) {
  var pins = findPins();
  for (var p = 0; p < pins.length; p++) {
    if (pins[p].classList.contains('map__pin--active')) {
      pins[p].classList.remove('map__pin--active');
    }
  }
  event.currentTarget.classList.add('map__pin--active');
};

/**
 * Отрисовываем метки на карте + устанавливаем обработчик событий для нажатия по метке
 * @method
 * @return {[type]} [Сгенерированные метки]
 */
var renderPoints = function (f) {
  var mapPoint = buttonTemplate.cloneNode(true);
  mapPoint.style.left = similarAdverts[f].location.x + 'px';
  mapPoint.style.left = similarAdverts[f].location.y + 'px';
  mapPoint.querySelector('img').src = similarAdverts[f].author.avatar;

  mapPoint.addEventListener('click', function (evt) {
    activePins(evt);
  });

  return mapPoint;
};

/**
 * Заполняем объявление на карте
 * @method
 * @return {[type]} [Сгенерированные объявления]
 */
var renderPin = function (l) {
  var pinNode = pinTemplate.cloneNode(true);

  pinNode.querySelector('.popup__avatar').src = similarAdverts[l].author.avatar;
  pinNode.querySelector('h3').textContent = similarAdverts[l].offer.title;
  pinNode.querySelector('small').textContent = similarAdverts[l].offer.address;
  pinNode.querySelector('.popup__price').textContent = similarAdverts[l].offer.price + '&#x20bd;' + '/ночь';
  pinNode.querySelector('h4').textContent = similarAdverts[l].offer.type;
  pinNode.querySelectorAll('p')[2].textContent = similarAdverts[l].offer.rooms + ' комнаты для ' + similarAdverts[l].offer.guests + ' гостей';
  pinNode.querySelectorAll('p')[3].textContent = 'Заезд после ' + similarAdverts[l].offer.checkin + ' , выезд до ' + similarAdverts[l].offer.checkout;
  pinNode.querySelectorAll('p')[4].textContent = similarAdverts[l].offer.description;
  pinNode.querySelector('.popup__features').replaceWith(featuresHtml(l));

  return pinNode;
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
 * Функция для нахождения всех меток
 */
var findPins = function () {
  return document.querySelectorAll('.map__pin');
};

/**
 * Функция для нахождения всех карточек
 */
var findCards = function () {
  return document.querySelectorAll('.map__card');
};

/**
 * Функция для 
 * Скрывания всех карточек с карты
 * @param  {Входной массив}
 */
var hideCards = function (cardsArray) {
  for (var i = 0; i < cardsArray.length; i++) {
   cardsArray[i].classList.add('hidden');
  }
};


/**
 * Обработчик события(нажатия мышкой) по главной метке на карте
 */
mainPin.addEventListener('mouseup', function () {
  mainPinMouseupHandler();
  hideCards(findCards());
});








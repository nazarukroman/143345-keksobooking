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
  noticeForm.classList.remove('notice__form--disabled');
};

/**
 * Обработчик события(нажатия мышкой) по главной метке на карте
 */
mainPin.addEventListener('mouseup', mainPinMouseupHandler);

/**
 * Функция которая скрывает объявление
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

var title = document.querySelector('#title');
/**
 * Обработчик событий для "Заголовка объявления"
 * Если сообщение сообщение слишком короткое, длинное или не значение пропущено
 * То у инпута border становится красным
 * Если полве валидное, то удаляется атрибут style
 */
title.addEventListener('invalid', function () {
  if (title.validity.tooShort) {
    title.setAttribute('style', 'border-color: red');
  } else if (title.validity.tooLong) {
    title.setAttribute('style', 'border-color: red');
  } else if (title.validity.valueMissing) {
    title.setAttribute('style', 'border-color: red');
  } else {
    title.setCustomValidity('');
    title.removeAttribute('style');
  }
});

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var TIMEIN_TIMEOUT_COUNT = 3;
/**
 * Обработчик события – изменение селекта Время заезда
 */
timeIn.addEventListener('change', function () {
  timeInChangeHandler(TIMEIN_TIMEOUT_COUNT);
});

/**
 * Обработчик события – изменение селекта Время выезда
 */
timeOut.addEventListener('change', function () {
  timeOutChangeHandler(TIMEIN_TIMEOUT_COUNT);
});

/**
 * Функция, при изменении селекта Время заезда, селект Время выезда становится таким же
 * @param  {[number]} timeInCount [Число обозначающее количество индексов в селекте]
 */
var timeInChangeHandler = function (timeInCount) {
  for (var z = 0; z < timeInCount; z++) {
    if (timeIn.selectedIndex === z) {
      timeOut.selectedIndex = z;
    }
  }
};

/**
 * Функция, при изменении селекта Время выезда, селект Время заезда становится таким же
 * @param  {[number]} timeOutCount [Число обозначающее количество индексов в селекте]
 */
var timeOutChangeHandler = function (timeOutCount) {
  for (var x = 0; x < timeOutCount; x++) {
    if (timeOut.selectedIndex === x) {
      timeIn.selectedIndex = x;
    }
  }
};

var accomondationType = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var accomondationTypes = {
  flat: 0,
  bungalo: 1,
  house: 2,
  palace: 3
};
var BUNGALO_MIN_PRICE = 0;
var FLAT_MIN_PRICE = 1000;
var HOUSE_MIN_PRICE = 5000;
var PALACE_MIN_PRICE = 10000;

/**
 * Обработчик событий для "Цена за ночь"
 * Если число слишком маленькое, большое или вводится не число
 * То у инпута border становится красным
 * Если полве валидное, то удаляется атрибут style
 */
priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.rangeUnderflow) {
    title.setAttribute('style', 'border-color: red');
  } else if (priceInput.validity.rangeOverflow) {
    title.setAttribute('style', 'border-color: red');
  } else if (priceInput.validity.typeMismatch) {
    title.setAttribute('style', 'border-color: red');
  } else {
    title.removeAttribute('style');
  }
});
/**
 * Обработчик события - при изменении селекта "Тип жилья" меняется минимальная сумма за ночь
 */
accomondationType.addEventListener('change', function () {
  accomondationTypeChangeHandler();
});

/**
 * Функция которая проверяет выбранное значение в селекте "Тип жилья"
 * и ставит минимальную "Цена за ночь" в зависимости от "Тип жилья"
 */
var accomondationTypeChangeHandler = function () {
  if (accomondationType.options.selectedIndex === accomondationTypes.bungalo) {
    priceInput.setAttribute('min', BUNGALO_MIN_PRICE);
  } else if (accomondationType.options.selectedIndex === accomondationTypes.flat) {
    priceInput.setAttribute('min', FLAT_MIN_PRICE);
  } else if (accomondationType.options.selectedIndex === accomondationTypes.house) {
    priceInput.setAttribute('min', HOUSE_MIN_PRICE);
  } else if (accomondationType.options.selectedIndex === accomondationTypes.palace) {
    priceInput.setAttribute('min', PALACE_MIN_PRICE);
  }
};

var roomNumber = document.querySelector('#room_number');
var roomCapacity = document.querySelector('#capacity');
var rooms = {
  oneRoom: 0,
  twoRooms: 1,
  threeRooms: 2,
  hundredRooms: 3
};
var guests = {
  threePeople: 0,
  twoPeople: 1,
  oneMan: 2,
  notForPeope: 3
};
/**
 * Обработчик события - при изменении селекта "Кол-во комнат" меняется селект "Количество мест"
 */
roomNumber.addEventListener('change', function () {
  roomNumberChangeHandler();
});

/**
 * Обработчик события - при изменении селекта "Количество мест" меняется селект "Кол-во комнат"
 */
roomCapacity.addEventListener('change', function () {
  roomCapacityChangeHandler();
});

/**
 * Функция которая проверяет выбранное значение в селекте "Кол-во комнат"
 * и ставит в селекте "Количество мест" необходимый индекс
 */
var roomNumberChangeHandler = function () {
  if (roomNumber.options.selectedIndex === rooms.oneRoom) {
    roomCapacity.selectedIndex = guests.oneMan;
  } else if (roomNumber.options.selectedIndex === rooms.twoRooms) {
    roomCapacity.selectedIndex = guests.twoPeople;
  } else if (roomNumber.options.selectedIndex === rooms.threeRooms) {
    roomCapacity.selectedIndex = guests.threePeople;
  } else if (roomNumber.options.selectedIndex === rooms.hundredRooms) {
    roomCapacity.selectedIndex = guests.notForPeope;
  }
};

/**
 * Функция которая проверяет выбранное значение в селекте "Количество мест"
 * и ставит в селекте "Кол-во комнат" необходимый индекс
 */
var roomCapacityChangeHandler = function () {
  if (roomCapacity.selectedIndex === guests.oneMan) {
    roomNumber.options.selectedIndex = rooms.oneRoom;
  } else if (roomCapacity.selectedIndex === guests.twoPeople) {
    roomNumber.options.selectedIndex = rooms.twoRooms;
  } else if (roomCapacity.selectedIndex === guests.threePeople) {
    roomNumber.options.selectedIndex = rooms.threeRooms;
  } else if (roomCapacity.selectedIndex === guests.notForPeope) {
    roomNumber.options.selectedIndex = rooms.hundredRooms;
  }
};

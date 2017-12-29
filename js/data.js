'use strict';

(function () {
  var flats = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var typesRusMap = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var times = ['12:00', '13:00', '14:00'];
  var OFFERS_COUNT = 8;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;

  /**
   * Функция которая генерирует объект
   * @method
   * @param  {[number]} a [Индекс]
   * @return {[object]} [Типовой объект]
   */
  var getSingleOffer = function (a) {
    var location = window.untils.getRandomAddress(MIN_X, MAX_X, MIN_Y, MAX_Y);
    var advertObject = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + [a + 1] + '.png'
      },

      'offer': {
        'title': flats[a],
        'address': location.x + ', ' + location.y,
        'price': window.untils.getRandomNumber(1000, 1000000),
        'type': typesRusMap[window.untils.getRandomArrayValue(types)],
        'rooms': window.untils.getRandomNumber(1, 5),
        'guests': window.untils.getRandomNumber(5, 50),
        'checkin': window.untils.getRandomArrayValue(times),
        'checkout': window.untils.getRandomArrayValue(times),
        'features': window.untils.getRandomFeatures(features),
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
   * [Глобальная функция, которая заполняет массив данными]
   * @param  {[number]} offersCount [Количество объявлений]
   * @return {[array]} [Массив с данными об объявлениях]
   */
  var getOffers = function (offersCount) {
    var offersArray = [];
    for (var i = 0; i < offersCount; i++) {
      offersArray[i] = getSingleOffer(i);
    }
    return offersArray;
  };
  window.data = {
    getOffers: getOffers(OFFERS_COUNT),
    times: times,
    typesRusMap: typesRusMap
  };
})();

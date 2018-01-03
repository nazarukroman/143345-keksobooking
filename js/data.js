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

  var onLoad = function (offers) {
    window.offersObject = offers;
  };

  window.backend.download(onLoad);

  var getShortObject = function () {
    var shortOffers = window.offersObject.slice(0, 5);
    return shortOffers;
  };

  window.data = {
    times: times,
    typesRusMap: typesRusMap,
    onLoad: onLoad,
    getShortObject: getShortObject
  };
})();

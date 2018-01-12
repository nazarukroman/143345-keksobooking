'use strict';

(function () {
  var typesRusMap = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var times = ['12:00', '13:00', '14:00'];
  var PIN_LIMIT_COUNT = 5;

  /**
   * [Получаем данные с сервера]
   * @param  {[object]} offers [Объект с данными с сервера]
   */
  var onLoad = function (offers) {
    window.offersObject = offers;
  };

  window.backend.download(onLoad);

  /**
   * [Делаем из объекта с сервера объект длинной 5]
   * @return {[object]} [Объект с сервера]
   */
  var getShortObject = function () {
    var shortOffers = window.offersObject.slice(0, PIN_LIMIT_COUNT);
    return shortOffers;
  };

  window.data = {
    times: times,
    typesRusMap: typesRusMap,
    onLoad: onLoad,
    getShortObject: getShortObject
  };
})();

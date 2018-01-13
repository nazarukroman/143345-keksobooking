'use strict';

(function () {
  var filters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = Array.from(document.querySelectorAll('#housing-features input'));
  var priceParams = {
    LOW: 10000,
    HIGH: 50000
  };

  /**
   * Функция - фильтр цены
   * @param  {[array]} data [Массив с объектами полученный с сервера]
   * @return {[boolean]} 
   */
  var filteredByPrice = function (data) {
    switch (housingPrice.value) {
      case 'low':
        return data.offer.price < priceParams.LOW;
      case 'middle':
        return data.offer.price >= priceParams.LOW && data.offer.price <= priceParams.HIGH;
      case 'high':
        return data.offer.price > priceParams.HIGH;
    }
    return false;
  };

  /**
   * Функция – фильтр удобств
   * @param  {[array]} data [Массив с объектами полученный с сервера]
   * @return {[boolean]} 
   */
  var filteredByFeatures = function (data) {
    for (var i = 0; i < filters.features.length; i++) {
      if (data.offer.features.indexOf(filters.features[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterData = function (data) {
    return ((housingType.value === 'any') ? true : (data.offer.type === housingType.value)) &&
    ((housingPrice.value === 'any') ? true : filteredByPrice(data)) &&
    ((housingRooms.value === 'any') ? true : (data.offer.rooms === parseInt(housingRooms.value, 10))) &&
    ((housingGuests.value === 'any') ? true : (data.offer.guests === parseInt(housingGuests.value, 10))) &&
    filteredByFeatures(data);
  };

  /**
   * Получаем новый отфильтрованный массив длинною pinLimits
   * @param  {[array]} data [Массив с объектами полученный с сервера]
   * @return {[array]}      [отфильтрованный массив длинною pinLimits]
   */
  var getFilteredData = function (data) {
    var newData = data.filter(filterData);

    return newData.slice(0, window.data.pinLimits);
  };

  var filtersChangeHandlers = function () {
    var card = document.querySelector('.map__card');
    if (window.map.mapSection.contains(card)) {
      card.classList.add('hidden');
    }

    for (var j = 0; j < window.mapPin.length; j++) {
      if (!window.mapPin[j].classList.contains('map__pin--main')) {
        window.mapPins.removeChild(window.mapPin[j]);
      }
    }

    var filterDataObject = getFilteredData(window.offersObject);
    window.debounce(window.pin.getPinsFragment(filterDataObject));
  };

  var housingTypeChangeHandler = function (evt) {
    filters.type = evt.target.value;

    filtersChangeHandlers();
  };

  var housingPriceChangeHandler = function (evt) {
    filters.price = evt.target.value;

    filtersChangeHandlers();
  };

  var housingRoomsChangeHandler = function (evt) {
    filters.rooms = evt.target.value;

    filtersChangeHandlers();
  };

  var housingGuestsChangeHandler = function (evt) {
    filters.rooms = evt.target.value;

    filtersChangeHandlers();
  };

  /**
   * [Проверяем какой элемент из списка выбран(checked) записываем его в массив filters.features]
   * @return {[type]} [description]
   */
  var selectFeatures = function () {
    var accum = [];
    housingFeatures.map(function (item) {
      if (item.checked === true) {
        accum.push(item.value);
      }
    });
    return accum;
  };

  housingFeatures.forEach(function (item) {
    item.addEventListener('change', function () {
      filters.features = selectFeatures();
      filtersChangeHandlers();
    });
  });


  housingType.addEventListener('change', housingTypeChangeHandler);
  housingPrice.addEventListener('change', housingPriceChangeHandler);
  housingRooms.addEventListener('change', housingRoomsChangeHandler);
  housingGuests.addEventListener('change', housingGuestsChangeHandler);
})();

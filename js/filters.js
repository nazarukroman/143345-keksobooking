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

  var filterData = function (offers, filtersObj) {
    var newData = offers.filter(function (item) {
      var filteredByFeatures = true;

      for (var i = 0; i < filtersObj.features.length; i++) {
        if (item.offer.features.indexOf(filtersObj.features[i]) === -1) {
          filteredByFeatures = false;
          break;
        }
      }
      var filteredByPrice = (
        (item.offer.price < 10000 && filtersObj.price === 'low') ||
        (item.offer.price >= 10000 && item.offer.price <= 50000 && filtersObj.price === 'middle') ||
        (item.offer.price > 50000 && filtersObj.price === 'high') ||
        filtersObj.price === 'any');


      return ((item.offer.type === filtersObj.type || filtersObj.type === 'any') &&
        filteredByPrice &&
        (item.offer.rooms.toString() === filtersObj.rooms || filtersObj.rooms === 'any') &&
        (item.offer.guests.toString() === filtersObj.guests || filtersObj.guests === 'any') &&
        filteredByFeatures);

    });

    return newData.slice(0, 4);
  };

  var filtersChangeHandlers = function () {
    var card = document.querySelector('.map__card');
    card.classList.add('hidden');

    for (var j = 0; j < window.mapPin.length; j++) {
      if (!window.mapPin[j].classList.contains('map__pin--main')) {
        window.mapPins.removeChild(window.mapPin[j]);
      }
    }

    var filterDataObject = filterData(window.offersObject, filters);
    window.pin.getPinsFragment(filterDataObject);
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
    });
  });


  housingType.addEventListener('change', housingTypeChangeHandler);
  housingPrice.addEventListener('change', housingPriceChangeHandler);
  housingRooms.addEventListener('change', housingRoomsChangeHandler);
  housingGuests.addEventListener('change', housingGuestsChangeHandler);

  window.filters = {
    filters: filters
  };
})();

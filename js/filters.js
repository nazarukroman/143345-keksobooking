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
    var newData = offersElements.filters(function (item) {

    });

    return newData.slice(0, 4);
  };

  var filtersChangeHandlers = function () {
    for (var j = 0; j < window.mapPin.length; j++) {
      mapPins.removeChild(window.mapPin[j]);
    }

    var newData = filterData(window.offersObject, filters);

    window.pin.getPinsFragment(newData);
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
    debugger;
    housingFeatures.reduce(function (accumulator, item) {
      if (item.checked === true) {
        accumulator.push(item.value);
      }
      return accumulator;
    }, []);
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
    filters: filters,
  }
})();

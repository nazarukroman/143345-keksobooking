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

  var housingTypeChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.type = selectedValue;
  };

  var housingPriceChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.price = selectedValue;
  };

  var housingRoomsChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.rooms = selectedValue;
  };

  var housingGuestsChangeHandler = function (evt) {
    var selectedValue = evt.currentTarget[evt.currentTarget.selectedIndex].value;

    filters.rooms = selectedValue;
  };

  var selectFeatures = function () {
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

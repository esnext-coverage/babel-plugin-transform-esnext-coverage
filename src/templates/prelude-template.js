var VARIABLE = (function (context) {
  var locations = JSON.parse(LOCATIONS);
  context[NAMESPACE] = context[NAMESPACE] || {};
  context[NAMESPACE][FILEPATH] = locations;
  return function (id, value) {
    locations[id][0]++;
    return value;
  };
})(
  typeof global === 'undefined' ? window : global
);

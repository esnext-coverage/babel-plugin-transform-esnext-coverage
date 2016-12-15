/* eslint-disable no-undef, no-unused-vars */

const VARIABLE = (function (context) {
  const locations = JSON.parse(LOCATIONS);
  context[NAMESPACE] = context[NAMESPACE] || {};
  context[NAMESPACE][FILEPATH] = locations;
  return function (id, value) {
    locations[id][0] += 1;
    return value;
  };
})(
  typeof global === 'undefined' ? window : global
);

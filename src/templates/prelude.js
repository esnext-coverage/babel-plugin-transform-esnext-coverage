/* eslint-disable no-undef, no-unused-vars */

const VARIABLE = (function (context) {
  const locations = JSON.parse(LOCATIONS);
  context[NAMESPACE] = context[NAMESPACE] || {};
  context[NAMESPACE].files = context[NAMESPACE].files || {};
  context[NAMESPACE].files[FILEPATH] = {coverage: locations};
  return function (index, value) {
    locations[index][0] += 1;
    return value;
  };
})(
  typeof global === 'undefined' ? window : global
);

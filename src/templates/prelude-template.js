var VARIABLE = (function (context) {
  var tokens = JSON.parse(TOKENS);
  var locations = JSON.parse(LOCATIONS);
  var stack = [];
  context[NAMESPACE] = context[NAMESPACE] || {};
  context[NAMESPACE][FILEPATH] = [locations, tokens, stack];
  return function (id, value) {
    locations[id][0]++;
    stack.push(id);
    return value;
  };
})(
  typeof global === 'undefined' ? window : global
);

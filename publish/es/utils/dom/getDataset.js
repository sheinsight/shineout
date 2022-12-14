export default (function (props) {
  if (!props) return {};
  var keys = Object.keys(props);
  return keys.reduce(function (acc, key) {
    if (key.indexOf('data-') !== 0) return acc;
    acc[key] = props[key];
    return acc;
  }, {});
});
function mapToArray(map, key) {
  if (!map || map.size === 0) return [];
  var v = [];
  var it = map[key]();

  for (var _iterator = it, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var i = _ref;
    v.push(i);
  }

  return v;
}

export function keysToArray(map) {
  return mapToArray(map, 'keys');
}
export function valuesToArray(map) {
  return mapToArray(map, 'values');
}
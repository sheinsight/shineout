import { isObject, isMergeable } from './is';
import { insertPoint } from './flat';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var PATH_MODE = {
  loose: '?',
  strict: '!',
  insert: '^',
  append: '$'
};
export function filterProps(obj, props) {
  if (props === void 0) {
    props = [];
  }

  if (!isObject(obj)) return obj;

  if (typeof props === 'function') {
    var prediction = props;
    props = [];
    Object.keys(obj).forEach(function (k) {
      if (prediction(obj[k])) props.push(k);
    });
  }

  var newObj = {};
  props.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return newObj;
} // Object.values()

export var objectValues = function objectValues(obj) {
  if (!obj) return [];
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
}; // object only, not handle array.

export var deepMerge = function deepMerge(target, source, options) {
  if (target === void 0) {
    target = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _options = options,
      clone = _options.clone,
      removeUndefined = _options.removeUndefined,
      skipUndefined = _options.skipUndefined;
  if (!isMergeable(source)) return source;
  var dest = {};

  if (isMergeable(target)) {
    Object.keys(target).forEach(function (k) {
      dest[k] = clone ? deepMerge({}, target[k], options) : target[k];
      if (removeUndefined && dest[k] === undefined) delete dest[k];
    });
  }

  Object.keys(source).forEach(function (k) {
    if (isMergeable(source[k]) && isMergeable(target[k])) {
      dest[k] = deepMerge(target[k], source[k], options);
    } else {
      if (skipUndefined && source[k] === undefined) return;
      dest[k] = deepMerge({}, source[k], options);
      if (removeUndefined && dest[k] === undefined) delete dest[k];
    }
  });
  return dest;
};
export function pathGenerator(raw) {
  var path = insertPoint(raw);
  var reg = /^\[(\d+)\]$/;
  var pathModeValues = objectValues(PATH_MODE);
  var index = 0;
  var last = 0;
  var prop = '';
  var results = [];

  while (index >= 0) {
    index = path.indexOf('.', last);
    prop = path.substring(last, index === -1 ? undefined : index);
    var mode = void 0;
    var lastChar = prop.charAt(prop.length - 1);

    if (pathModeValues.includes(lastChar)) {
      mode = lastChar;
      prop = prop.substring(0, prop.length - 1);
    } // array index


    var match = reg.exec(prop); // eslint-disable-next-line

    if (match) prop = parseInt(match[1], 10);
    last = index + 1;
    results.push([prop, index === -1 ? undefined : path.substring(last), mode]);
  }

  return results;
}
export var deepSet = function deepSet(target, path, value, options) {
  if (options === void 0) {
    options = {};
  }

  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string') throw new Error('Path must be a string.');
  var _options2 = options,
      removeUndefined = _options2.removeUndefined,
      skipUndefined = _options2.skipUndefined;
  var mergeOptions = {
    clone: true,
    removeUndefined: removeUndefined,
    skipUndefined: skipUndefined // empty root

  };

  if (path === '') {
    var dest = deepMerge(target, value, mergeOptions);
    Object.keys(dest).forEach(function (k) {
      target[k] = dest[k];
    });
    return target;
  }

  var current = target;

  for (var _iterator = pathGenerator(path), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var _ref2 = _ref,
        prop = _ref2[0],
        next = _ref2[1],
        mode = _ref2[2];

    if (next) {
      var nextIsArray = /^\[\d+\]/.test(next);
      if (!current[prop]) current[prop] = nextIsArray ? [] : {};

      if (nextIsArray && !Array.isArray(current[prop])) {
        throw new Error("Path " + path + " expect an array.");
      } else if (Array.isArray(current[prop]) && !nextIsArray) {
        throw new Error("Path " + path + " is an array, expect an object.");
      }

      current = current[prop];
      continue;
    }

    if (options.forceSet) {
      current[prop] = value;
    } else if (mode === PATH_MODE.insert) {
      current.splice(prop, 0, value);
    } else if (mode === PATH_MODE.append) {
      current.splice(prop + 1, 0, value);
    } else {
      if (skipUndefined && value === undefined) break;
      current[prop] = isMergeable(current[prop]) && isMergeable(value) ? deepMerge(current[prop], value, mergeOptions) : value;
    }

    if (removeUndefined && value === undefined) delete current[prop];
  }

  return target;
};
export var deepGet = function deepGet(target, path, options) {
  if (options === void 0) {
    options = {};
  }

  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string') throw new Error('Path must be a string.'); // empty root

  if (path === '') return target;
  var _options3 = options,
      defaultValue = _options3.defaultValue,
      strictMode = _options3.strictMode;
  var current = target;

  for (var _iterator2 = pathGenerator(path), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref3;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref3 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref3 = _i2.value;
    }

    var _ref4 = _ref3,
        prop = _ref4[0],
        mode = _ref4[2];
    var isStrict = mode === PATH_MODE.strict || strictMode && defaultValue === undefined && mode !== PATH_MODE.loose;

    if (current != null && hasOwnProperty.call(current, prop)) {
      current = current[prop];
    } else if (isStrict) {
      throw new Error("Path " + path + " is not exist.");
    } else {
      current = defaultValue;
      break;
    }
  }

  return current;
};
export var deepRemove = function deepRemove(target, path) {
  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string' || !path) throw new Error('Path must be a string.');
  var current = target;
  var nextIsArray = false;

  for (var _iterator3 = pathGenerator(path), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref5;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref5 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref5 = _i3.value;
    }

    var _ref6 = _ref5,
        prop = _ref6[0],
        next = _ref6[1];

    if (current == null || !hasOwnProperty.call(current, prop)) {
      break;
    }

    if (next) {
      current = current[prop];
      nextIsArray = /^\[\d+\]/.test(next);
    } else if (isObject(current)) {
      if (nextIsArray) throw new Error('Target is an object, expect array');
      delete current[prop];
    } else {
      if (!nextIsArray) throw new Error('Target is an array, expect object');
      current.splice(prop, 1);
    }
  }

  return target;
};
export var deepHas = function deepHas(target, path) {
  if (!isObject(target)) throw new Error('Target must be an object.');
  if (typeof path !== 'string') throw new Error('Path must be a string.');
  if (path === '') return true;
  var current = target;

  for (var _iterator4 = pathGenerator(path), _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
    var _ref7;

    if (_isArray4) {
      if (_i4 >= _iterator4.length) break;
      _ref7 = _iterator4[_i4++];
    } else {
      _i4 = _iterator4.next();
      if (_i4.done) break;
      _ref7 = _i4.value;
    }

    var _ref8 = _ref7,
        prop = _ref8[0];
    if (!current || !hasOwnProperty.call(current, prop)) return false;
    current = current[prop];
  }

  return true;
};
export var entries = function entries(obj) {
  if (!obj) return [];
  var keys = Object.keys(obj);
  return keys.map(function (key) {
    return [key, obj[key]];
  });
};
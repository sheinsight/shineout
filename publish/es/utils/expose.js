import { isObject } from './is';
import { exposeClass } from '../styles/expose';
import cssAccessors, { cleanCache } from './css-accessors';
import { capitalize } from './strings';
import { entries } from './objects';
import { setInjectType, injectTag, getInjectType, cleanStyleObj } from './vars-inject';
var types = ['primary', 'warning', 'danger', 'success', 'secondary'];
var attrs = ['background', 'color', 'border'];

function validateFormat(data) {
  if (!isObject(data)) {
    console.error(new Error('Should enter a json data with attrs(key) and types(types)'));
    return false;
  } // attributes


  if (Object.keys(data).filter(function (v) {
    return attrs.indexOf(v) === -1;
  }).length > 0) {
    console.error(new Error("The attribute your entered does not exist need[" + attrs.join('/') + "]"));
    return false;
  } // types


  if (Object.values(data).filter(function (v) {
    return types.indexOf(v) === -1;
  }).length > 0) {
    console.error(new Error("The type your entered does not exist need[" + types.join('/') + "]"));
    return false;
  }

  return true;
}

function getClassname(data) {
  if (!validateFormat(data)) return '';
  return Object.keys(data).map(function (attr) {
    return exposeClass(data[attr] + "-" + attr);
  }).join(' ');
}

function resetTheme() {
  Object.keys(cssAccessors).forEach(function (module) {
    var setter = "set" + capitalize(module);
    cssAccessors[module][setter](Object.keys(cssAccessors[module]).reduce(function (obj, key) {
      obj[key] = undefined;
      return obj;
    }, {}));
  });
}

function setStyleWithTag(options, custom) {
  cleanStyleObj();

  if (!options) {
    resetTheme();
  } else {
    for (var _iterator = entries(options), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
          key = _ref2[0],
          values = _ref2[1];
      var setterName = "set" + capitalize(key);
      if (cssAccessors[key] && cssAccessors[key][setterName]) cssAccessors[key][setterName](values);
    }
  }

  injectTag(custom);
}

var style = {
  getClassname: getClassname,
  setStyle: function setStyle(options, custom) {
    if (custom === void 0) {
      custom = {};
    }

    if (getInjectType() === 'tag') {
      setStyleWithTag(options, custom);
      return;
    }

    if (!options) {
      resetTheme();
      return;
    }

    for (var _iterator2 = entries(options), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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
          key = _ref4[0],
          values = _ref4[1];
      var setterName = "set" + capitalize(key);
      if (cssAccessors[key] && cssAccessors[key][setterName]) cssAccessors[key][setterName](values);
    }
  },
  cleanCache: cleanCache,
  setInjectType: setInjectType,
  getInjectType: getInjectType
};
var color = cssAccessors.color;
export { color, style, types };